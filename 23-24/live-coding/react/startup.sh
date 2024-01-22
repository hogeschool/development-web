#!/bin/sh

(cd client; yarn; yarn fe) & (cd server; yarn be)