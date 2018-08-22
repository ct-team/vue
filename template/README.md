## 更新

1、去除图片压缩功能

2、修复autoprefix build后不一致的问题


## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

## 文件目录

build-user //项目配置目录

--config.js //项目配置文件

src //源代码目录

--assets //资源目录

----css

----img

----js

--view   //模板目录 可配置多页面 

----index  //项目文件名 如： index.html 使用index作为文件夹

--pages  //页面目录


--router //路由目录

--config //配置目录

--api    //接口目录

--compontents //组件目录

----common //公共组件目录

----content //项目组件目录

--store  //vuex 数据目录

## 多文件方法

在view文件内按实际页面内容建立目录

如有2个页面 index.html 与 user.html

view 结构 如下

```
view

--index

----main.js

----index.ejs

--user

----main.js

----index.ejs

```

推荐：其他文件也可按照 页面名称 建立相应文件夹

