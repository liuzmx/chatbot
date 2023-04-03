# ChatBot

- NodeJS: 16.15.1
- Python: 3.8

## 本地开发

### 后端服务

```shell
# 进入代码目录
cd backend

# 新建虚拟环境
conda create -n chatbot -y python=3.8

# 激活虚拟环境
conda activate chatbot

# 安装依赖
pip install -r requirements.txt

# 启动服务
uvicorn main:app --host 0.0.0.0 --port 8000 --access-log --reload
```

### 前端服务

```shell
# 进入代码目录
cd frontend

# 安装依赖
yarn install

# 启动服务
yarn dev
```
