import os
from huggingface_hub import snapshot_download
from dotenv import load_dotenv

load_dotenv()

def download_medgemma():
    model_id = "google/medgemma-1.5-4b-it"
    print(f"🚀 Preparing to download {model_id}...")
    print("NB: You must have accepted the Gemma terms on Hugging Face first.")
    
    token = os.getenv("HF_TOKEN")
    if not token:
        print("⚠️ HF_TOKEN environment variable not found.")
        print("Please run: export HF_TOKEN='your_token_here'")
        # return

    try:
        path = snapshot_download(
            repo_id=model_id,
            allow_patterns=["*.json", "*.safetensors", "*.model", "*.txt"],
            token=token
        )
        print(f"✅ Model downloaded successfully to: {path}")
    except Exception as e:
        print(f"❌ Error downloading model: {e}")

if __name__ == "__main__":
    download_medgemma()
