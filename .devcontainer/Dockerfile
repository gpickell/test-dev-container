FROM node:alpine
RUN apk add bash git
RUN ln -sf /bin/bash /bin/sh
RUN addgroup vs-coder
RUN adduser -S -G vs-coder -s /bin/bash vs-coder
USER vs-coder
ENTRYPOINT [ "/bin/sh", "-c" ]
CMD ["exec sleep infinity"]
