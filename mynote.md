<!--
 * @Description: 
 * @version: 1.0
 * @Author: shaomin fei
 * @Date: 2020-08-16 13:38:23
 * @LastEditors: shaomin fei
 * @LastEditTime: 2020-09-11 13:23:28
-->
1. 上传到  github:
**  github上创建repository
**  代码目录执行git init
** 关联远端到本地 git remote add origin https://github.com/shaomin-fei/final-project-server
** 网站上创建一个 readme.md，或是本地传一个上去，要有文件， repo才建好了。
** 新建 .gitignore文件，添加 /node_modules/，会忽略该文件夹下的内容
** 上传之前pull一下 git pull origin master
** add 后，设置上传流，并push 到远端，git push --set-upstream origin master
**以后用 git push就可以推送了。

2.nodemon 以前，我们开发一个node后端服务时，每次更改文件，均需重启一下，服务才能生效。这使我们的开发效率降低了很多。nodemon的出现，可以随时监听文件的变更，自动重启服务，我们开发时只需关注代码即可，不再需要手动重启服务。