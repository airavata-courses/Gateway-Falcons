import sys,os
import requests
from configparser import ConfigParser


def register_service():
    data = {'servicePath': service_path,
            'serviceUrl': host_ip + ':' + host_port,
            }

    # sending post request and saving response as response object
    r = requests.post(url=api_endpoint, json=data)

    # extracting response text
    pastebin_url = r.text
    print("The pastebin URL is:%s" % pastebin_url)


if __name__ == '__main__':

    N = len(sys.argv)
    parser = ConfigParser()
    if os.path.isfile('./registerconfig.ini'):
        parser.read('./registerconfig.ini')
    else:
        print("error: No configuration file present")
        exit()
    api_endpoint = parser.get('ZookeeperServer', 'api')
    base_path = parser.get('Application', 'basePath')
    if N < 2:
        print("Error: less parameter. Run: registerSerive.py hostIP hostPort serviceName")
        exit()
    host_ip = sys.argv[1]
    host_port = sys.argv[2]
    service_path = base_path + sys.argv[3]
    register_service()
