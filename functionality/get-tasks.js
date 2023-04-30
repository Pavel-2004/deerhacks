const EventEmitter = require("events")
const workflow = new EventEmitter()

const request = (prompt, callback) => {
  const params = {
    model: "text-davinci-003",
    prompt,
    temperature: 0.7,
    max_tokens: 3000,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  }
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type' : 'application/json',
      'Authorization' : 'Bearer ' + String("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")
    },
    body: JSON.stringify(params)
  }

  fetch('https://api.openai.com/v1/completions', requestOptions)
    .then(res => {
      return res.text()
    })
    .then(res => {
      return JSON.parse(res)
    })
    .then(res => {
      callback(res.choices[0].text.trim().replace("\n", " "))
    })
    .catch(err => {

    })
}

/*

const info = {count, topicTitles: [], topics}

    function getTopic(info) {
      sendRequest("/api/get-title", {
        titleNum: info.topicTitles.length + 1,
        topics: info.topics
      })
        .then(newTopic => {
          const topic = newTopic.topic
          info.topicTitles.push(topic)
          if (info.topicTitles.length < info.count) {
            setTimeout(() => {
              getTopic(info)
            }, 500)
          }
          else {
            workflow.emit("getParagraph", info)
          }
        })
    }

    getTopic(info)
 */
export function getTasks(name, description, callback) {

  workflow.once("getTasks", () => {
    const prompt =
      `
      I have a school assignment called ${name} and it has the following description\n
        ${description} \n
        create a list of tasks that I can follow to finish this project
    `
    request(prompt, function (result) {
      console.log('tasks', result)
      workflow.emit("getCount", result)
    })
  })

  workflow.once("getCount", (tasks) => {
    const prompt =
      `
      How many tasks are there in the following list of tasks: \n
      ${tasks}
      return only a number
      `
    request(prompt, function(count) {
      console.log('count', count)
      workflow.emit("getTaskTitle", parseInt(count), tasks)
    })
  })

  workflow.once("getTaskTitle", (count, tasks) => {
    const info = {count, taskTitles: [], tasks}
    function getTaskTitle(info) {
      const prompt =
        `
        What is task #${info.taskTitles.length + 1} in the following list of tasks \n
        ${tasks}
        `
      request(prompt, function(title) {
        info.taskTitles.push(title)
        if (info.taskTitles.length < info.count) {
          setTimeout(() => {
            getTaskTitle(info)
          }, 500)
        }
        else {
          console.log('task titles', info)
          workflow.emit("getTaskTime", info)
        }
      })
    }

    getTaskTitle(info)
  })

  workflow.once("getTaskTime", (info) => {
    info.times = []
    function getTime(info) {
      const prompt =
        `
        How long should the following task take in hours for a student:\n
        ${info.taskTitles[info.times.length]} \n
        return just a number
        `
      request(prompt, function(time) {
        info.times.push(parseInt(time))
        if (info.times.length < info.count) {
          setTimeout(() => {
            getTime(info)
          }, 500)
        }
        else {
          console.log('task times', info)
          workflow.emit("success", info)
        }
      })
    }

    getTime(info)
  })

  workflow.once("success", (info) => {
    const final = []
    info.taskTitles.forEach((title, titleIndex) => {
      final.push([title, info.times[titleIndex]])
    })
    callback(final)
  })

  workflow.emit("getTasks")
}

