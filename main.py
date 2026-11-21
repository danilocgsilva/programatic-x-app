from fastapi import FastAPI, Form, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from programatic_x.LongType import LongType

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

@app.get("/", response_class=HTMLResponse)
async def index(request: Request):
    return templates.TemplateResponse(request, "index.html")

@app.post("/submit", response_class=HTMLResponse)
def submit(
    request: Request,
    data: str = Form(...),
    seconds: int = Form(10, ge=0),
    delay_by_type_ms: int = Form(0, ge=0),
    shift_enter_in_newlines: bool = Form(False),
):
    LongType().type(
        data,
        milliseconds=delay_by_type_ms,
        shift_enter=shift_enter_in_newlines,
    )
    return templates.TemplateResponse(
        request,
        "index.html",
        {"submitted": True, "data": data, "seconds": seconds},
    )