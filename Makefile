#!/usr/bin/make -f
IMAGE := chatroom
VERSION := latest

.PHONY: build

# ------------------------------------------------------------------------------

build:
	docker build -t=$(IMAGE):$(VERSION) .
