#start containers in dev environment
start-dev:
		#build and start docker containers
		docker-compose -f docker-compose.dev.yml up -d --build
#stop containers in dev environment
stop-dev:
		docker-compose -f docker-compose.dev.yml down