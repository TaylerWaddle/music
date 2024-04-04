import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelcase'

export default {
  install(app) {
    const baseComponents = import.meta.glob('../components/base/*.vue', {
      eager: true
    })

    // converts each property to an array where the first item contains the key, and the second contains the value
    Object.entries(baseComponents).forEach(([path, module]) => {
      const componentName = upperFirst(
        camelCase(
          path
            .split('/')
            .pop()
            .replace(/\.\w+$/, '')
        )
      )
      console.log(path, componentName)

      app.component(`Base${componentName}`, module.default)
    })
  }
}
