To run on 443 port without sudo: 
    `sudo setcap 'cap_net_bind_service=+ep' $(readlink -f $(which node))`
