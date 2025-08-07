FROM node:alpine
RUN apk add git
RUN addgroup vs-coder
RUN adduser -S -G vs-coder vs-coder
USER vs-coder
ENTRYPOINT [ "/bin/sh", "-c" ]
CMD ["exec sleep infinity"]
