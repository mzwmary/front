# git的基本使用
## git init
新创建一个项目文件夹之后，文件夹只是一个普通的文件夹，对于文件夹内任何内容的修改不会受到版本控制系统的管理。

我们需要为当前的项目文件夹初始化一个版本库，来管理当前项目。

```shell
git init
```
git init一个项目执行一次

## git status
查看当前git仓库的状态信息

## git add
告诉git要追踪管理哪些文件
```shell
git add 文件名

git add * 
git add -A
```

## git commit 
告诉git 帮我生成一个新的版本
```shell
git commit -m "版本的描述信息"
```

## git log
可以查看所有的已经提交的版本信息
版本的版本号
修改的作者
修改的时间
版本的说明

设置用户名和邮箱的命令
只需要执行一次（一个电脑执行一次）
```shell
git config --global user.name 用户名
git config --global user.email 邮箱
```


## git checkout 文件名
将暂存区的内容恢复到工作目录


## git reset --hard 版本号（git log中去找）
将版本库中指定的版本恢复到工作目录！
