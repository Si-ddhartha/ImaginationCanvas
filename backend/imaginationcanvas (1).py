from auth_token import auth_token
from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
from io import BytesIO
import base64

import torch
from torch import autocast
from diffusers import StableDiffusionPipeline

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=['*'],
    allow_headers=['*'],
    allow_methods=['*']
)

device = "cuda"
model_id = "CompVis/stable-diffusion-v1-4"
pipe = StableDiffusionPipeline.from_pretrained(model_id, revision="fp16", torch_dtype=torch.float16, use_auth_token=auth_token)
pipe.to(device)

@app.get('/')
def generate(query: str):
    with autocast(device):
        image = pipe(query, guidance_scale=8.5).images[0]
    
    image.save("generated_image.png")
    buffer = BytesIO()
    image.save(buffer, format="PNG")
    imgstr = base64.b64encode(buffer.getvalue())

    return Response(content=imgstr, media_type="image/png")
