FROM --platform=linux/amd64 node:18
WORKDIR /app
COPY package*.json ./
RUN rm -rf node_modules package-lock.json
RUN npm install
COPY . .
RUN npm run build
ENV NEXT_PUBLIC_PUBLIC_IMAGE_URL="/images"
ENV NEXT_PUBLIC_CSS_PATH="/css"
ENV NEXT_PUBLIC_AUTH_POINT="https://api.life-link.online/auth"
ENV NEXT_PUBLIC_API_BASE_URL="https://api.life-link.online"
ENV NEXT_PUBLIC_FRONTEND_URL="http://life-link.online"
ENV NEXT_PUBLIC_FUNDRAISE_IMAGE="http://localhost:7001/api/fund_raise/image/fund_raiser_image"
ENV NEXT_PUBLIC_GOOGLE_CLIENT_ID="874720109787-p2nv2vv47ur47i4hpjhv06opanehim1t.apps.googleusercontent.com"
ENV NEXT_PUBLIC_GOOGLE_CLIENT_SECRET="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"
ENV NEXT_PUBLIC_GOOGLE_MAP_KEY="AIzaSyDr2_r_ejwoLRx5FB3sMdwSbTdxRUIsY8k"
ENV NEXT_PUBLIC_FACEBOOK_APP_ID="466722899047254"
ENV NEXT_PUBLIC_FACEBOOK_SECRET_ID="af43d5c2917b62c7bc254a79e998d84d"
ENV NEXT_PUBLIC_NEXTAUTH_SECRET="JWT_SECRET"
ENV NEXT_PUBLIC_NVIDIA_API="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"
ENV NEXT_PUBLIC_MAP_API="https://nominatim.openstreetmap.org/search"
ENV NEXT_PUBLIC_PLACE_API="hJoLVBSPy7Kaw5XCg3ZvhhnZ9KAIJYgf"
ENV NEXT_PUBLIC_SOCKET_URL="https://api.life-link.online/profile"
EXPOSE 3000
CMD ["npm", "run", "start"]
