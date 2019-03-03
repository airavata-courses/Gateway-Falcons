import sys,os
import requests
from configparser import ConfigParser


def register_service():
    data = {'servicePath': service_path,
            'serviceUrl': host_ip + ':' + host_port,
            }

    # sending post request and saving response as response object
    r = requests.post(url=registerapi_endpoint, json=data)

    # extracting response text
    pastebin_url = r.text
    print("The pastebin URL is:%s" % pastebin_url)


def  delete_service():
    data = {'servicePath': service_path}

    # sending post request and saving response as response object
    r = requests.post(url=deleteapi_endpoint, json=data)

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
    registerapi_endpoint = parser.get('ZookeeperServer', 'registerapi')
    deleteapi_endpoint = parser.get('ZookeeperServer', 'deleteapi')
    base_path = parser.get('Application', 'basePath')
    if N < 2:
        print("Error: less parameter.")
        print("Run: registerService.py  1 hostIP hostPort serviceName")
        print("Run: registerService.py  2 serviceName")
        exit()
    if sys.argv[1] == "1":
        host_ip = sys.argv[2]
        host_port = sys.argv[3]
        service_path = base_path + sys.argv[4]
        register_service()
    if sys.argv[1] == "2":
        service_path = base_path + sys.argv[2]
        delete_service()

