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

Then, to start the development server, run this in the terminal:

```
uvicorn main:app --host 0.0.0.0 --port 8010 --reload
```

The server will restart automatically when Python files change.
