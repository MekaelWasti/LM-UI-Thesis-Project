# LM-UI

[Paper](https://arxiv.org/abs/2402.07938) | [Deployment](https://thesisproject.mekaelwasti.com/) | [Video Demonstration](https://www.youtube.com/watch?v=-Lc2TnxeEPA&t=330s)

Research into a dynamic and powerful framework that merges classical user interfaces with powerful Large Language Models, achieving real-time speech-controlled intelligent applications.

## Motivations

The recent meteoric advancements in large language
models have showcased a remarkable capacity
for logical reasoning and “comprehension”.
These newfound capabilities have opened a door
to a new-generation of software, as we can observe
with all the ways it is being applied in
the industry. By comprehending a user’s needs through analysis
of natural textual inputs, an LLM engine can
identify the most appropriate UI component and
execute the desired actions. This integration can
evolve static UI systems into highly dynamic and
adaptable solutions, introducing a new frontier of
intelligent and responsive user experiences. Such
a framework would fundamentally shift how users
accomplish daily tasks, skyrocket efficiency, and
greatly reduce cognitive load.

## Approach

<div align="center">
  <img src="https://github.com/MekaelWasti/LM-UI-Thesis-Project/blob/main/Paper/Figure%201_2.png" alt="LLM Engine Diagram">
</div>

<br>

The underlying challenge across the entire research
was effectively fusing LLMs with eventdriven
UIs. Developing an effective framework
capable of being scaled with increasing application
counts and fostering potential for implementation
as an operating system was always a
priority. A paradigm as dynamic as the software it
intends to power was vital. Implementing a bruteforce
hard-coded solution would not serve a great
purpose or carry the potential for scalability and
impact required for next-generation software. This
is why we took our time and carefully crafted
each component of this framework with future
scaling in mind, leaving room for future advanced
integrations such as multi-agent systems as well
as more powerful LLM model configurations.


<figure>
  <img src="https://github.com/MekaelWasti/LM-UI-Thesis-Project/blob/main/Paper/Tree%20Structure_2.png" alt="Tree Structure">
  <figcaption>Annotation Data Structure Selection & Traversal</figcaption>
</figure>

<br>
<br>

Another point of concern was the establishment
of a data structure suitable and most effective for
representing the overarching system, applications,
as well as all UI components per application.
Through our research, a tree structure made for the
most accurate representation of the overall system
as well as efficient traversal.

## Use


<div align="center">
  <img src="https://github.com/MekaelWasti/LM-UI-Thesis-Project/blob/main/Paper/favicon.png" alt="LM-UI Logo">
</div>

You can access and use the framework's current deployment [here](https://thesisproject.mekaelwasti.com/)
<br>
*If your inputs are not producing results, the backend server may be down for maintenance* 


## Setup
To set this project up for local use, you can: 

- Clone the repo
- ```npm install``` all the packages
- cd into ```.\thesis-project\```
- ```npm start``` to spin up the front end on your local environment and browser
- Create a new terminal
- cd into ```.\backend\```
- Run ```python3.10 -m uvicorn main:app --reload --host 0.0.0.0 --port 63030 --ssl-keyfile=./ZERO_SSL/private.key --ssl-certfile=./ZERO_SSL/certificate.crt```
- You should be good to go


## Paper

Available as a pre-print on [Arxiv](https://arxiv.org/abs/2402.07938)

*Accepted for publication*
