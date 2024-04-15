from deepface import DeepFace
import time
import json

records = []

def run_timer():
    try:
        dfs = DeepFace.find(img_path = "C:/Users/legoc/Programming/Symposium/current.png", db_path = "C:/Users/legoc/AppData/Roaming/FaceDB", enforce_detection = False)
        
        if (len(dfs) < 1):
            return

        obj = dfs[0].to_dict(orient='records')[0]
        add_to_records(obj)

        
    except:
        print("No face found")

def add_to_records(record):
    if (len(record) < 1):
        return
    if (len(records) > 0):
        records.pop(0)
    records.append(record)

    f = open("face_record.json", "a")
    f.truncate(0)
    f.write(json.dumps(records))
    f.close()

while True:
    run_timer()
    time.sleep(1)