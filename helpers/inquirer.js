const { green } = require('colors');
const inquirer = require('inquirer')
require('colors');

const questions = [
    {
        type: 'list',
        name: 'option',
        message: 'What you want to do?',
        choices: [
            {
                value:1,
                name:`${'1.'.green} Buscar.`
            },
            {
                value:2,
                name:`${'2.'.green} Historial`
            },
            {
                value:0,
                name: `${'0.'.green} Quit`
            }

        ]
    }
]

const inquirerMenu = async() =>{
    console.log('===================='.green);
    console.log('  Choose an option');
    console.log('====================\n'.green);

    const {option} = await inquirer.prompt(questions)
    return option;
}

const pause = async() => {
    return await inquirer.prompt({type:'input',name:'pause', message:`Press ${'enter'.green} to continue`});
}

const deleteMenu = async(tasks = [])=>{
    const questions = [{type:'list',name:'id',message:'What you want to delete', choices:tasks}]
    const {id} = await inquirer.prompt(questions)
    return id;
}

const confirm = async(message = '')=>{
    const question = [{type:'confirm', name:'ok', message}];
    const { ok } = await inquirer.prompt(question);
    return ok;
}

const readInput = async(message)=>{
    const question = [
        {
            type:'input',
            name:'desc',
            message,
            validate(value){
                if(value.length === 0){
                    return 'Please input a value.';
                }
                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(question);
    return desc;
}

const checkTaskComplete = async(tasks=[])=>{
    const choices = tasks.map((task, i)=>{
        const idx = `${i + 1}`.green;

        return {
            value:task.id,
            name:`${idx} ${task.desc}`,
            checked: task.completedAt != null
        }
    })

    const question = [
        {
            type:'checkbox',
            name:'ids',
            message: 'Choose',
            choices
        }
    ]
    const {ids} = await inquirer.prompt(question);
    return ids;
}
module.exports = {
    inquirerMenu,
    pause,
    readInput,
    deleteMenu,
    confirm,
    checkTaskComplete
}