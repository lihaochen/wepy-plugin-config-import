import path from 'path'
import fs from 'fs-extra'

let _depList = []

/**
 * 引入组件并替换 usingComponents 中的值
 * @param components 组件列表
 */
function ImportComponentsAndReplacePath(components) {
    Object.keys(components).map(name => {
        // 如果 components 以 ~ 开头，则解析为 node_modules 中的包，此时对该组件进行copy并修改路径
        if (/^\~/.test(components[name])) {
            importComponents.call(this, components[name])
            replaceImportPath.call(this, components, name)
        }
    })
}

/**
 * replace path
 */
function replaceImportPath(components, name) {
    let targetCompPath = path.resolve(process.cwd(), components[name].replace('~', 'dist/npm/'))
    targetCompPath = path.resolve(targetCompPath, 'index')
    components[name] = path.relative(path.dirname(this.file), targetCompPath)
}

/**
 * copy native component dir to `dist/npm`
 */
function importComponents(component) {
    if (_depList.indexOf(component) > -1) {
        return
    }
    let sourceComp = path.resolve(process.cwd(), component.replace('~', 'node_modules/'))
    let npmDir = component.replace('~', 'dist/npm/')
    let targetDir = path.resolve(process.cwd(), npmDir)
    fs.copy(sourceComp, targetDir)
    this.output({ action: '写入', file: targetDir })
    _depList.push(component)
}

export default class {
    constructor(options) {
        return function() {
            if (this.type === 'config') {
                try {
                    let config = JSON.parse(this.code)
                    if (config.usingComponents) {
                        try {
                            ImportComponentsAndReplacePath.call(this, config.usingComponents)
                        } catch (e) {
                            console.error(e)
                        }
                        this.code = JSON.stringify(config)
                        this.done(this)
                    } else {
                        this.next()
                    }
                } catch (e) {
                    this.catch(e)
                }
            } else {
                this.next()
            }
        }
    }
}