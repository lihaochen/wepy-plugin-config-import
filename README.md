## wepy-plugin-config-import

### 介绍

wepy-plugin-config-import 是一款为了让wepy支持导入小程序原生组件而开发的插件。

欢迎提交ISSUE或者PR。


### Demo

如果要导入 iview-weapp，只需要在 config 的 usingComponents中添加对应组件即可

```html
<script>
    import wepy from 'wepy';

    export default class Index extends wepy.page {
        config = {
            navigationBarTitleText: 'test',
            usingComponents: {
                'i-button': '~iview-weapp/dist/button'
            }
        }
    }
</script>
```


### 安装使用


```console
npm install wepy-plugin-config-import -D
```

#### wepy.config.js

```console
plugins: {
    'config-import': {}
},
```
