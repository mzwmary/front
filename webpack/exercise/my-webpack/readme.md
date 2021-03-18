1. npm init -y
2. 创建 bin
3. 创建 /bin/my-webpack.js文件
4. my-webpack.js文件下 
  声明node环境 #!/usr/bin/env node  不是#!/user/bin/env node
5. 将包链接到全局  . 将包发布到npm,下载安装全局  . 本地连接到全局
6. 在package.json文件下配置bin  "bin":{"my-webpack":"./bin/my-webpack.js"}
7. npm link 链接到全局  相当于在装全局包的地方加了一个快捷方式  mac :sudo npm link