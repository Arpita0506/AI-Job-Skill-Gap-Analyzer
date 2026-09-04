"""
Seed demo data providing 3 complete e2e scenarios.
1. Software Engineer
2. Data Analyst
3. Machine Learning Engineer
"""

DEMO_PRESETS = {
    "software_engineer": {
        "title": "Full-Stack Software Engineer Scenario",
        "description": "Mid-level developer matching against a Senior Cloud & Full-Stack Engineer role emphasizing AWS & Docker.",
        "resume_text": """
Alex Chen
San Francisco, CA | alex.chen@example.com | (555) 019-2834 | linkedin.com/in/alexchen-dev

PROFESSIONAL SUMMARY
Dynamic Full-Stack Engineer with 3+ years of experience building scalable web applications, REST APIs, and responsive UIs using Python, JavaScript, React, and SQL. Proven track record of improving site performance and building robust backend services.

SKILLS
• Programming Languages: Python, JavaScript, TypeScript, SQL, HTML5, CSS3
• Frameworks & Libraries: React, Node.js, Express.js, FastAPI, Flask, Tailwind CSS
• Databases: PostgreSQL, MongoDB, Redis, MySQL
• Cloud & DevOps: AWS (S3, EC2 basic), Git, GitHub Actions, Linux
• Tools & Practices: REST APIs, Jest, Postman, Agile/Scrum, Jira

WORK EXPERIENCE
Full-Stack Developer | TechInnovate Solutions | 2022 - Present
• Designed and developed 15+ RESTful API microservices using Python FastAPI and Node.js, servicing 50,000+ daily active users.
• Built interactive single-page dashboards in React and TypeScript, improving user engagement metrics by 35%.
• Optimized PostgreSQL database queries and indexing strategies, reducing query latency by 45ms across high-traffic endpoints.
• Collaborated in an Agile team of 6 engineers, participating in code reviews and CI/CD pipeline improvements via GitHub Actions.

Junior Web Developer | CloudScale Media | 2021 - 2022
• Developed responsive frontend user interfaces using React and Tailwind CSS for client portal.
• Integrated third-party payment gateways and authentication endpoints using Express.js and JWT tokens.
• Resolved 100+ critical bug tickets, maintaining a 98% sprint completion rate.

EDUCATION
B.S. in Computer Science | California State University | 2021
• Key Coursework: Data Structures, Algorithms, Database Systems, Web Engineering.

PROJECTS
E-Commerce Analytics Engine | React, Python, PostgreSQL, Redis
• Built a real-time sales tracking dashboard rendering analytics graphs for 10,000+ transaction records.
• Implemented Redis caching to optimize dashboard load times under 200ms.

CERTIFICATIONS
• AWS Certified Cloud Practitioner (2023)
""",
        "job_description_text": """
Senior Full-Stack & Cloud Engineer
CloudTech Systems | Remote / San Francisco, CA

Job Summary:
We are looking for a Senior Full-Stack Engineer to architect and build high-performance cloud applications. The ideal candidate will possess strong experience with modern frontend frameworks, containerization, microservices, and AWS cloud infrastructure.

Key Responsibilities:
• Lead technical design and implementation of distributed backend microservices and modern frontend applications.
• Containerize applications using Docker and orchestrate microservices on Kubernetes clusters.
• Architect and manage cloud infrastructure on AWS utilizing EC2, S3, IAM, Lambda, and CloudWatch.
• Drive automated CI/CD pipeline buildouts and infrastructure-as-code (Terraform).
• Mentor junior software engineers and champion software engineering best practices.

Required Technical Skills:
• Python or TypeScript / JavaScript
• React or modern component-based UI framework
• Docker containerization and Kubernetes management
• AWS Cloud Infrastructure (EC2, S3, IAM, Lambda, ECS)
• PostgreSQL or MongoDB relational/NoSQL design
• Microservices architecture & RESTful API design
• CI/CD pipeline automation

Preferred Qualifications:
• Experience with GraphQL and Redis caching
• Familiarity with Terraform or AWS CloudFormation
• Knowledge of Kubernetes Helm charts and monitoring (Prometheus, Grafana)

Education & Experience:
• Bachelor's degree in Computer Science or equivalent practical experience
• 3+ years of professional full-stack development experience
"""
    },
    "data_analyst": {
        "title": "Data Analyst Scenario",
        "description": "Data analyst proficient in Python, SQL, and Power BI matching against a Senior Analytics role requiring Snowflake & Tableau.",
        "resume_text": """
Sarah Miller
Chicago, IL | sarah.m@example.com | (555) 987-6543

PROFESSIONAL SUMMARY
Detail-oriented Data Analyst with 3 years of experience transforming raw enterprise data into actionable business insights. Expert in SQL, Python, Excel, and Power BI visualization dashboards.

SKILLS
• Analytics & Modeling: SQL, Python (Pandas, NumPy), Descriptive Statistics, Data Cleaning, ETL
• Data Visualization: Power BI, Excel Charts, Matplotlib, Seaborn
• Databases: MySQL, PostgreSQL, MS SQL Server
• Business Tools: Advanced Excel (PivotTables, VBA), Google Analytics, Jira

EXPERIENCE
Data Analyst | Retail Intelligence Corp | 2022 - Present
• Built 10+ interactive executive dashboards in Power BI tracking KPI metrics across 200+ retail stores.
• Extracted and transformed large datasets (1M+ rows) using SQL and Python Pandas pipelines.
• Automated weekly sales reporting processes using Python scripts, saving 8 hours of manual team effort per week.

Junior Data Specialist | Insight Analytics | 2021 - 2022
• Performed customer segmentation analysis identifying top 15% revenue generating customer cohorts.
• Prepared presentation decks for senior management summarizing quarterly performance trends.

EDUCATION
B.S. in Statistics & Data Analytics | University of Illinois | 2021

CERTIFICATIONS
• Microsoft Certified: Power BI Data Analyst Associate
""",
        "job_description_text": """
Senior Data Analyst - Business Intelligence
Global Insights Inc. | Chicago, IL

Responsibilities:
• Partner with cross-functional executive teams to deliver data-driven strategic insights.
• Build advanced data pipelines in Snowflake and write complex SQL queries.
• Create enterprise dashboards using Tableau and Power BI.
• Conduct statistical analysis, customer churn modeling, and A/B testing evaluation.

Requirements:
• SQL fluency (Window functions, CTEs, query optimization)
• Tableau or Power BI dashboard creation
• Snowflake or BigQuery cloud data warehouse experience
• Python or R for statistical analysis and data wrangling
• Data Warehousing concepts (Star schema, ETL pipelines)
• Excellent stakeholder communication skills

Education & Experience:
• B.S. or M.S. in Statistics, Analytics, Math, or Computer Science
• 2+ years of enterprise data analytics experience
"""
    },
    "ml_engineer": {
        "title": "Machine Learning Engineer Scenario",
        "description": "ML Practitioner with Scikit-Learn & TensorFlow matching against an MLOps & PyTorch production ML role.",
        "resume_text": """
David Kim
Seattle, WA | dkim@example.com | (555) 456-7890

PROFESSIONAL SUMMARY
Machine Learning Practitioner with hands-on experience developing ML models, NLP classification, and predictive data pipelines using Python, Scikit-learn, Pandas, and TensorFlow.

TECHNICAL SKILLS
• Machine Learning: Supervised/Unsupervised Learning, Regression, Classification, Scikit-learn, TensorFlow, Keras
• Data Processing: Python, NumPy, Pandas, OpenCV, NLTK, SQL
• MLOps & Cloud: AWS S3, Docker basic, Git, MLflow
• Programming: Python, C++, SQL

EXPERIENCE
ML Developer | AI Vision Labs | 2022 - Present
• Developed NLP sentiment analysis classification models reaching 91% validation accuracy on 50,000 text records.
• Optimized tabular feature engineering pipelines using Scikit-learn, improving model inference time by 25%.
• Deployed REST API inference endpoints using FastAPI for ML model predictions.

PROJECTS
Predictive Customer Churn Model | Python, Scikit-learn, Pandas
• Trained XGBoost and Random Forest classifiers predicting churn with 0.88 AUC-ROC.

EDUCATION
M.S. in Data Science | University of Washington | 2022
B.S. in Computer Engineering | 2020
""",
        "job_description_text": """
Senior Machine Learning Engineer (MLOps)
AI NextTech | Seattle, WA

Role Overview:
We are seeking an experienced ML Engineer to design, deploy, and monitor scalable deep learning models in production environments.

Responsibilities:
• Develop deep learning models using PyTorch and PyTorch Lightning.
• Implement automated MLOps pipelines using Kubeflow, MLflow, and Docker.
• Deploy scalable real-time inference microservices on Kubernetes clusters.
• Optimize model quantization, GPU CUDA performance, and distributed training.

Required Skills:
• Python, PyTorch, Scikit-learn
• MLOps & Model Deployment (MLflow, BentoML, Triton)
• Docker containerization and Kubernetes orchestrations
• Natural Language Processing (NLP) or Computer Vision (CV)
• AWS / Cloud ML services (SageMaker, S3, EC2 GPU)
• Distributed model training and CUDA acceleration

Education:
• Master's or Ph.D. in CS, Artificial Intelligence, or Machine Learning
• 3+ years experience delivering production ML systems
"""
    }
}
