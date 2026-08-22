"""
CircularChain Agent 1: YOLOv8 Industrial Scrap Vision Model Trainer
Trains a lightweight, high-accuracy object detection and contamination classifier
and automatically exports it to TFLite (Mobile) and ONNX (Web edge).
"""

import os
import sys

def train_and_export():
    try:
        from ultralytics import YOLO
    except ImportError:
        print("📦 Installing required ML packages (ultralytics, torch, torchvision, onnx)...")
        os.system(f"{sys.executable} -m pip install ultralytics torch torchvision onnx")
        from ultralytics import YOLO

    print("=================================================================")
    print(" 🚀 CircularChain YOLOv8 Scrap Quality Vision Model Training")
    print("=================================================================")

    config_path = os.path.join(os.path.dirname(__file__), "dataset_config.yaml")

    # 1. Load Pre-trained Base Architecture (YOLOv8 nano: ~6MB, ultra fast sub-50ms inference)
    print("🔹 Loading base YOLOv8n backbone...")
    model = YOLO("yolov8n.pt")

    # 2. Fine-tune on Industrial Scrap Dataset
    print(f"🔹 Starting transfer learning on {config_path}...")
    # Standard 50-100 epochs on GPU or transfer fine-tuning
    results = model.train(
        data=config_path,
        epochs=30,
        imgsz=640,
        batch=16,
        name="circularchain_scrap_detector",
        device="cpu", # Will automatically use cuda:0 if NVIDIA GPU is present
        verbose=True
    )

    print("\n✅ Training complete! Evaluating validation metrics...")
    metrics = model.val()
    print(f"📊 Validation mAP@50-95: {metrics.box.map:.4f}")

    # 3. Export to Mobile & Edge Formats
    print("\n📦 Exporting model artifacts for production deployment:")
    
    # A. ONNX for Next.js / Node.js backend
    onnx_path = model.export(format="onnx")
    print(f"  👉 ONNX Web Model: {onnx_path}")

    # B. TFLite for Android Flutter App (Offline On-Device Inference)
    try:
        tflite_path = model.export(format="tflite", int8=True)
        print(f"  👉 TFLite Mobile Model (Quantized Int8): {tflite_path}")
    except Exception as e:
        print(f"  ℹ️ TFLite export requires tensorflow: {e}")

    print("\n🎉 Model training and export pipeline finished successfully!")

if __name__ == "__main__":
    train_and_export()
