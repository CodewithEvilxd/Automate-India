# CircularChain Autonomous Vision AI — Custom Scrap Detection Model

This directory contains the custom PyTorch and Ultralytics YOLOv8 model training and inference pipeline for CircularChain Agent 1 (Optical Quality & Contamination Vision Engine).

---

## Model Architecture
* Backbone: YOLOv8n (Nano) / YOLOv8s (Small) Transfer-Learned
* Inference Speed: < 45ms on CPU / < 12ms on Edge GPU
* Target Output Formats:
  * best.onnx -> For Next.js Edge and Node.js Web API
  * best.tflite (Int8 Quantized) -> For Android Flutter Mobile App (Offline on-device inference)

---

## The 8 Industrial Scrap Classes
1. aluminum_extrusion (6063 Clean Architectural Profiles)
2. copper_berry_wire (#1 Pure Unalloyed Berry Copper)
3. plastic_pet_bottle (Transparent Clear PET Flakes)
4. plastic_hdpe_container (Rigid Milk/Detergent Bottles)
5. paper_cardboard_occ (Baled Old Corrugated Containers)
6. electronic_pcb_board (Telecom & High-Density Circuit Boards)
7. steel_heavy_melting (HMS 1 & 2 Scrap)
8. mixed_contaminated_waste (Unsegregated Mixed Municipal/Commercial Garbage)

---

## How to Train the Model

1. Initialize Dataset Directories:
```bash
python ai_model/generate_synthetic_scrap_dataset.py
```

2. Run YOLOv8 Training and Automated ONNX / TFLite Export:
```bash
python ai_model/train_scrap_model.py
```

3. Run Standalone Image Inference:
```bash
python ai_model/infer_scrap_image.py path/to/specimen.jpg
```
