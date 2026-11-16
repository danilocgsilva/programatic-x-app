# Programatix App

A web browser interface to control programatic-x.

You will need the Python and Node installed locally.

Watch the packages of `project.toml` to install first the dependencies.

To start the application, first, build the frontend assets:

```
npm run build:css
```

The, to start the web server, just type at the terminal:

```
uvicorn main:app --host 0.0.0.0 --port 8010
```
