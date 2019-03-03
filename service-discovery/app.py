from flask import Flask, jsonify, request
from kazoo.client import KazooClient
from configparser import ConfigParser
from flask_cors import cross_origin
import os
import logging

parser = ConfigParser()
if os.path.isfile('./config.ini'):
    parser.read('./config.ini')
else:
    print("error: No configuration file present")
    exit()

host = parser.get('Zookeeper', 'host')
port = parser.get('Zookeeper', 'port')
hostpath = str(host) + ':' + port

app = Flask(__name__)
logging.basicConfig()


@app.route('/register1', methods=['POST'])
@cross_origin(origin='localhost', headers=['Content- Type', 'Authorization'])
def register_service():
    try:
        post_data = request.get_json()
        servicePath = post_data.get('servicePath')
        serviceUrl = post_data.get('serviceUrl')
        zk = KazooClient(hosts=hostpath)
        zk.start()
        if not zk.exists(servicePath):
            zk.ensure_path(servicePath)
        zk.set(servicePath, serviceUrl.encode())
        zk.stop()
    except Exception as e:
        return jsonify({'message: zookeeper is not running', e}), 404
    return jsonify({'message': 'Service is registered'}), 200


@app.route('/getservice1', methods=['POST'])
@cross_origin(origin='localhost', headers=['Content- Type', 'Authorization'])
def get_serviceIp():
    try:
        post_data = request.get_json()
        servicePath = post_data.get('servicePath')
        zk = KazooClient(hosts=hostpath)
        zk.start()
        if not zk.exists(servicePath):
            return jsonify({'message':'Path does not exist'}),400
        data, stat = zk.get(servicePath)
        res = {
            'Version': stat.version,
            'data': data.decode("utf-8")
        }
    except Exception as e:
        return jsonify({'message', e}), 404

    return jsonify(res), 200

@app.route('/deleteservice', methods=['POST'])
@cross_origin(origin='localhost', headers=['Content- Type', 'Authorization'])
def delete_service():
    try:
        post_data = request.get_json()
        servicePath = post_data.get('servicePath')
        zk = KazooClient(hosts=hostpath)
        zk.start()
        zk.delete(servicePath,recursive=True)
    except Exception as e:
        return jsonify({'message', e}), 404
    return jsonify({'message': 'Service is deleted'}), 200


if __name__ == '__main__':
    app.run(host='0.0.0.0', port='5000')
