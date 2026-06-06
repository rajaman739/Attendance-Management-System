import cv2
import os

student_id = input("Enter Student ID: ")

path = f"dataset/{student_id}"

if not os.path.exists(path):
    os.makedirs(path)

cam = cv2.VideoCapture(0)

face_detector = cv2.CascadeClassifier(
    cv2.data.haarcascades +
    "haarcascade_frontalface_default.xml"
)

count = 0

print("\nLook at camera...")

while True:

    ret, img = cam.read()

    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    faces = face_detector.detectMultiScale(
        gray,
        1.3,
        5
    )

    for (x, y, w, h) in faces:

        cv2.rectangle(
            img,
            (x, y),
            (x + w, y + h),
            (255, 0, 0),
            2
        )

        count += 1

        cv2.imwrite(
            f"{path}/{count}.jpg",
            gray[y:y+h, x:x+w]
        )

        cv2.imshow("Face Capture", img)

    k = cv2.waitKey(100) & 0xff

    if k == 27:
        break

    elif count >= 30:
        break

print("\nFace samples captured.")

cam.release()
cv2.destroyAllWindows()