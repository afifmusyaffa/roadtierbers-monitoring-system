import urllib.request, json

data = json.dumps({"contents":[{"parts":[{"text":"hi"}]}]}).encode()
req = urllib.request.Request(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=YOUR_API_KEY",
    data=data,
    headers={"Content-Type": "application/json"}
)
try:
    resp = urllib.request.urlopen(req)
    print("SUCCESS:", resp.read().decode()[:500])
except urllib.error.HTTPError as e:
    print(f"ERROR Status: {e.code}")
    print(e.read().decode()[:800])
