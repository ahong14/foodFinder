#start containers in dev environment
start-dev:
	#build and start docker containers
	docker-compose -f docker-compose.dev.yml up -d --build --remove-orphans
#stop containers in dev environment
stop-dev:
	docker-compose -f docker-compose.dev.yml down --remove-orphans

#start containers in prod mode
start-production:
	docker-compose -f docker-compose.yml up -d --build --remove-orphans

stop-production:
	docker-compose -f docker-compose.yml down --remove-orphans

