import os
import torch
import torch.nn as nn
import joblib
import numpy as np

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
WEIGHTS_DIR = os.path.join(BASE_DIR, "..", "weights", "model_artifacts-20260708T150345Z-3-001", "model_artifacts")

class StackedLSTM(nn.Module):
    def __init__(self, input_size=4, hidden_size=64, num_layers=2, output_size=4, dropout=0.2):
        super(StackedLSTM, self).__init__()
        self.lstm = nn.LSTM(input_size, hidden_size, num_layers, batch_first=True, dropout=dropout)
        self.fc = nn.Sequential(
            nn.Linear(hidden_size, 32),
            nn.ReLU(),
            nn.Linear(32, output_size)
        )

    def forward(self, x):
        out, _ = self.lstm(x)
        out = self.fc(out[:, -1, :])
        return out

model_kendaraan = None
scaler_kendaraan = None

try:
    # Load state dict
    state_dict_info = torch.load(os.path.join(WEIGHTS_DIR, "model_lstm_kendaraan.pt"), map_location=torch.device('cpu'))
    
    # Initialize model
    model_kendaraan = StackedLSTM()
    model_kendaraan.load_state_dict(state_dict_info['model_state_dict'])
    model_kendaraan.eval()
    
    # Load scaler
    scaler_kendaraan = joblib.load(os.path.join(WEIGHTS_DIR, "scaler_kendaraan.joblib"))
    print("Successfully loaded Kendaraan Forecasting Model (LSTM)")
except Exception as e:
    print(f"Failed to load Kendaraan Forecasting Model: {e}")

def predict_kendaraan(yolo_history_3_steps):
    """
    yolo_history_3_steps: list of 3 dicts (one for each timestep),
    where each dict contains counts: {'Mobil': count, 'Bus': count, 'Truk': count, 'Motor': count}
    """
    if model_kendaraan is None or scaler_kendaraan is None:
        return {"error": "Model not loaded"}
    
    # Check if we have 3 steps, if not pad with zeros
    if len(yolo_history_3_steps) < 3:
        while len(yolo_history_3_steps) < 3:
            yolo_history_3_steps.insert(0, {'Mobil': 0, 'Bus': 0, 'Truk': 0, 'Motor': 0})
            
    # Keep only the last 3
    yolo_history_3_steps = yolo_history_3_steps[-3:]
    
    # Prepare input array
    # Order: mobil_penumpang, bus, truk, sepeda_motor
    X = []
    for step in yolo_history_3_steps:
        mobil = step.get('Mobil', 0)
        bus = step.get('Bus', 0)
        truk = step.get('Truk', 0)
        motor = step.get('Motor', 0)
        X.append([mobil, bus, truk, motor])
        
    X_arr = np.array(X, dtype=np.float32)
    
    # Scale input
    try:
        X_scaled = scaler_kendaraan.transform(X_arr)
        
        # Convert to tensor: shape (1, 3, 4)
        X_tensor = torch.tensor(X_scaled).unsqueeze(0)
        
        # Predict
        with torch.no_grad():
            pred_scaled = model_kendaraan(X_tensor)
            
        # Inverse transform
        pred_raw = scaler_kendaraan.inverse_transform(pred_scaled.numpy())[0]
        
        # Ensure no negative predictions and round to int
        pred_final = [max(0, int(round(val))) for val in pred_raw]
        
        return {
            "mobil_penumpang": pred_final[0],
            "bus": pred_final[1],
            "truk": pred_final[2],
            "sepeda_motor": pred_final[3]
        }
    except Exception as e:
        return {"error": str(e)}
