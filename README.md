# Programatix App

A web browser interface to control programatic-x.

You will need Python and Node installed locally.

Install the Python dependencies, including `programatic-x` from GitHub, with:

```
python -m pip install -e .
```

To start the application, first, build the frontend assets:

```
npm run build:css
```

Run the app on the machine whose keyboard should receive the text, and keep it
bound to localhost:

```
python -m uvicorn main:app --host 127.0.0.1 --port 8010 --reload
```

The server will restart automatically when Python files change.
