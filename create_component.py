import os
import string

print('Имя компонента (na-...):')
component_name = 'na-{}'.format(input())

dir_name = 'src/components/{}/'.format(component_name)
os.mkdir(dir_name)

vue_component = '{}{}.vue'.format(dir_name, component_name)
vue_template = '<template lang="pug">\n.{}\n</template>'.format(component_name)

with open(vue_component, 'w') as f:
    f.write(vue_template)

pascal_name = string.capwords(component_name.replace("-", " ")).replace(" ", "")
index_template = "import './styles'\n\nexport { default as " + pascal_name + " } from './" + component_name + ".vue'"

with open(dir_name + 'index.ts', 'w') as f:
    f.write(index_template)

styles_dir_name = dir_name + 'styles/'
os.mkdir(styles_dir_name)
scss_name = styles_dir_name + component_name + '.scss'
scss_template = '.' + component_name + ' {}' 

with open(scss_name, 'w') as f:
    f.write(scss_template)

with open(dir_name + 'styles/index.ts', 'w') as f:
    f.write("import './{}.scss'".format(component_name))
    