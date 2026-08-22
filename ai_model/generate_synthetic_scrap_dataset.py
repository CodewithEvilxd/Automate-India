"""
CircularChain Synthetic & Real Scrap Dataset Generator & Initializer
Prepares directories and annotations for YOLOv8 fine-tuning across 8 scrap classes.
"""

import os
import json
import random

CLASSES = [
    "aluminum_extrusion",
    "copper_berry_wire",
    "plastic_pet_bottle",
    "plastic_hdpe_container",
    "paper_cardboard_occ",
    "electronic_pcb_board",
    "steel_heavy_melting",
    "mixed_contaminated_waste"
]

def init_dataset_structure(base_dir="./scrap_data"):
    for split in ["train", "val", "test"]:
        os.makedirs(os.path.join(base_dir, "images", split), exist_ok=True)
        os.makedirs(os.path.join(base_dir, "labels", split), exist_ok=True)
    
    print(f"✅ Directory structure initialized under '{base_dir}'")
    print("📁 Ready to receive raw Mandi photos or TACO / Mendeley dataset downloads.")

if __name__ == "__main__":
    init_dataset_structure()
