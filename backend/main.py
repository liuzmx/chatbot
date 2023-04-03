import logging

from fastapi import FastAPI
from pydantic import BaseModel
from typing import Union

logger = logging.getLogger(__name__)
app = FastAPI(title="chatbot-demo", version="0.1.0")


def encapsulate(body: Union[None, dict, list], code: int = 200, message: str = "success"):
    """封装接口"""
    header = {"code": code, "message": message}
    if body is not None:
        return {"header": header, "body": body}
    return {"header": header}


class TextRequest(BaseModel):
    """请求格式"""

    text: str


@app.post("/api/v1/chatbot")
@app.post("/api/v1/chatbot/")
def receive(request: TextRequest):
    """文本语义特征"""

    text = request.text
    body = {"text": text, "res": "春风吹拂万重愁，嫩柳青丝缕缕愁。蝶舞蜂嗡空有影，人歌鱼跃不见楼。愁眠晓梦流苏泪，醉忆前尘白玉钩。一曲清歌春日醉，满帘花雨动情愁。"}
    return encapsulate(body)
