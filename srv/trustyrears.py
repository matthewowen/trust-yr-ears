import oauth2 as oauth
from flask import Flask as f
from flask import render_template, url_for, redirect, request, g, make_response
import urllib, secrets, json

app = f(__name__)

@app.route('/<query>')
def res(query):
    consumer = oauth.Consumer(secrets.KEY, secrets.SECRET)
    client = oauth.Client(consumer)
    r = client.request('http://api.rdio.com/1/', 'POST', urllib.urlencode({'method': 'search', 'query': query, 'types': 'Album', 'count': '1'}))
    d = json.loads(r[1])
    if d['status'] == 'ok' and d['result']['number_results'] > 0:

        resp = make_response(d['result']['results'][0]['embedUrl'])
        resp.headers['Access-Control-Allow-Origin'] = '*'
        return resp


if app.config['DEBUG']:
    from werkzeug import SharedDataMiddleware
    import os
    app.wsgi_app = SharedDataMiddleware(app.wsgi_app, {
      '/': os.path.join(os.path.dirname(__file__), 'static')
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)