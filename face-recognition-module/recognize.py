import cv2
import requests

# LOGIN TOKEN
JWT_TOKEN = input("Enter JWT Token: ")

# STUDENT NAMES
student_names = {
    1: "Aman Raj"
}

# LOAD TRAINED MODEL
recognizer = cv2.face.LBPHFaceRecognizer_create()
recognizer.read("trainer/trainer.yml")

# FACE DETECTOR
faceCascade = cv2.CascadeClassifier(
    cv2.data.haarcascades +
    "haarcascade_frontalface_default.xml"
)

font = cv2.FONT_HERSHEY_SIMPLEX

cam = cv2.VideoCapture(0)

attendance_marked = False

print("\nAttendance Scanner Started...\n")

while True:

    ret, img = cam.read()

    if not ret:
        print("Camera not detected")
        break

    gray = cv2.cvtColor(
        img,
        cv2.COLOR_BGR2GRAY
    )

    faces = faceCascade.detectMultiScale(
        gray,
        scaleFactor=1.2,
        minNeighbors=5
    )

    for (x, y, w, h) in faces:

        student_id, confidence = recognizer.predict(
            gray[y:y+h, x:x+w]
        )

        if confidence < 70:

            name = student_names.get(
                student_id,
                f"Student {student_id}"
            )

            cv2.putText(
                img,
                name,
                (x, y - 10),
                font,
                1,
                (0, 255, 0),
                2
            )

            cv2.putText(
                img,
                f"Confidence: {round(100 - confidence)}%",
                (x, y + h + 30),
                font,
                0.6,
                (0, 255, 0),
                2
            )

            if not attendance_marked:

                try:

                    payload = {
                        "studentId": student_id,
                        "subjectId": 1,
                        "status": "PRESENT"
                    }

                    headers = {
                        "Authorization": f"Bearer {JWT_TOKEN}",
                        "Content-Type": "application/json"
                    }

                    response = requests.post(
                        "http://localhost:8080/api/attendance",
                        json=payload,
                        headers=headers
                    )

                    print(
                        f"Attendance Marked: {response.status_code}"
                    )

                    print(
                        f"Response: {response.text}"
                    )

                    if response.status_code == 200:
                        attendance_marked = True

                except Exception as e:

                    print(
                        "Attendance API Error:"
                    )

                    print(e)

        else:

            cv2.putText(
                img,
                "Unknown",
                (x, y - 10),
                font,
                1,
                (0, 0, 255),
                2
            )

        cv2.rectangle(
            img,
            (x, y),
            (x + w, y + h),
            (255, 0, 0),
            2
        )

    cv2.imshow(
        "Attendance Scanner",
        img
    )

    key = cv2.waitKey(10) & 0xff

    if key == 27:
        break

cam.release()
cv2.destroyAllWindows()