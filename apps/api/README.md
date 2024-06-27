<a id="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <!-- <a href="https://github.com/genwithai/sbir-gen">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a> -->
  <h1 align="center">SBIR GEN</h3>


### Solicitation Proposal Generation API

<hr/>
&nbsp;
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>
&nbsp;


This repository contains an API for generating various types of documents including Proposals, Product Requirements Documents (PRD), and Technical Specifications Documents (TSD). The API is built using Node.js and Express, and utilizes the `pptxgenjs` library for generating PowerPoint presentations.

## Table of Contents
- [Table of Contents](#table-of-contents)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [Generate Proposal](#generate-proposal)
  - [Generate PRD](#generate-prd)
  - [Generate Technical Specifications](#generate-technical-specifications)
- [Configuration](#configuration)
- [Templates](#templates)
  - [PRD Template (`prdTemplate.txt`)](#prd-template-prdtemplatetxt)
  - [Technical Specifications Template (`tsdTemplate.txt`)](#technical-specifications-template-tsdtemplatetxt)
- [Contributing](#contributing)
- [License](#license)
  - [Process Flow](#process-flow)
  - [Routes](#routes)

## Features

- Generate PowerPoint proposals.
- Generate Product Requirements Documents (PRD).
- Generate Technical Specifications Documents (TSD).
- Download generated documents.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/document-generation-api.git
   cd document-generation-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Ensure you have the necessary templates and configuration files in the correct paths:
   - `templates/prdTemplate.txt`
   - `templates/tsdTemplate.txt`
   - `deck_generator/config.json`

## Usage

Start the server:
```bash
npm start
```

The server will run on `http://localhost:3000`.

### Generate Proposal

Send a POST request to `/api/v1/generate-proposal` with the following JSON data:

```json
{
  "product_name": "Innovative Tech Solution",
  "tagline": "Revolutionizing the Future",
  "agency": "National Science Foundation",
  "program": "Technology Advancement Program",
  "sbir_num": "NSF-2024-001",
  "company": "Tech Innovators Inc.",
  "topic_number": "TI-2024-059",
  "topic_title": "Advanced AI for Environmental Sustainability",
  "tech_focus": "Artificial Intelligence, Environmental Science",
  "proposal_number": "TI-PROP-2024-003",
  "project_overview": "This project aims to develop advanced AI technologies to tackle environmental challenges, including climate change and biodiversity loss.",
  "project_technical_merit": "The project leverages cutting-edge machine learning algorithms to predict climate patterns and suggest measures for biodiversity conservation.",
  "project_team": "Led by Dr. Jane Doe, a renowned expert in AI and environmental science, alongside a dedicated team of researchers and developers.",
  "project_commercialization": "The technology developed will be commercialized through partnerships with environmental organizations and government agencies, providing a scalable solution for global adoption.",
  "technical_problem": "Current environmental prediction models lack accuracy and fail to provide actionable insights for policy-making and conservation efforts.",
  "significance": "Improving prediction models through AI can significantly impact policy formulation, conservation strategies, and ultimately, global environmental sustainability.",
  "solution": "Our solution incorporates advanced machine learning techniques to enhance the accuracy of environmental predictions, enabling effective conservation strategies.",
  "problem_quote": "The greatest threat to our planet is the belief that someone else will save it.",
  "problem_quote_author": "Robert Swan"
}
```

### Generate PRD

Send a POST request to `/api/v1/generate-prd` with the same JSON data structure as above. The server will respond with a download link for the generated PRD document.

### Generate Technical Specifications

Send a POST request to `/api/v1/generate-tech-spec` with the same JSON data structure as above. The server will respond with a download link for the generated Technical Specifications document.

## Configuration

Ensure you have a `config.json` file in the `deck_generator` directory with the following structure:

```json
{
  "replacements": {
    "slide1": {
      "fields": {
        "{{product_name}}": "product_name",
        "{{tagline}}": "tagline",
        "{{agency}}": "agency",
        "{{program}}": "program",
        "{{sbir_num}}": "sbir_num"
      }
    },
    "slide2": {
      "fields": {
        "{{product_name}}": "product_name",
        "{{company}}": "company",
        "{{agency}}": "agency",
        "{{program}}": "program",
        "{{sbir_num}}": "sbir_num"
      }
    },
    "slide3": {
      "fields": {
        "{{project_overview}}": "project_overview",
        "{{agency}}": "agency",
        "{{program}}": "program",
        "{{sbir_num}}": "sbir_num"
      }
    },
    "slide4": {
      "fields": {
        "{{project_technical_merit}}": "project_technical_merit",
        "{{agency}}": "agency",
        "{{program}}": "program",
        "{{sbir_num}}": "sbir_num"
      }
    },
    "slide5": {
      "fields": {
        "{{project_team}}": "project_team",
        "{{agency}}": "agency",
        "{{program}}": "program",
        "{{sbir_num}}": "sbir_num"
      }
    },
    "slide6": {
      "fields": {
        "{{project_commercialization}}": "project_commercialization",
        "{{agency}}": "agency",
        "{{program}}": "program",
        "{{sbir_num}}": "sbir_num"
      }
    },
    "slide7": {
      "fields": {
        "{{technical_problem}}": "technical_problem",
        "{{agency}}": "agency",
        "{{program}}": "program",
        "{{sbir_num}}": "sbir_num"
      }
    },
    "slide8": {
      "fields": {
        "{{significance}}": "significance",
        "{{agency}}": "agency",
        "{{program}}": "program",
        "{{sbir_num}}": "sbir_num"
      }
    },
    "slide9": {
      "fields": {
        "{{solution}}": "solution",
        "{{agency}}": "agency",
        "{{program}}": "program",
        "{{sbir_num}}": "sbir_num"
      }
    },
    "slide10": {
      "fields": {
        "{{problem_quote}}": "problem_quote",
        "{{problem_quote_author}}": "problem_quote_author",
        "{{agency}}": "agency",
        "{{program}}": "program",
        "{{sbir_num}}": "sbir_num"
      }
    }
  }
}
```

## Templates

Ensure you have the following template files in the `templates` directory:

### PRD Template (`prdTemplate.txt`)

```txt
# Product Requirements Document (PRD) for {{PRODUCT_NAME}}
...
```

### Technical Specifications Template (`tsdTemplate.txt`)

```txt
# Technical Specifications Document (TSD) for {{PRODUCT_NAME}}
...
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

### Process Flow

graph TD
    A[Start] --> B[Receive Request]
    B --> C{Request Type}
    C -->|Proposal| D[Generate Proposal]
    C -->|PRD| E[Generate PRD]
    C -->|Technical Specifications| F[Generate Technical Specifications]
    D --> G[Load Configuration]
    E --> G
    F --> G
    G --> H[Replace Tokens]
    H --> I{Document Type}
    I -->|Proposal| J[Create PowerPoint Presentation]
    I -->|PRD| K[Create PRD Document]
    I -->|Technical Specifications| L[Create Technical Specifications Document]
    J --> M[Save File]
    K --> M
    L --> M
    M --> N[Send Response with Download Link]
    N --> O[End]


### Routes
/api/v1/llm/chat
/api/v1/llm/mistral-chat
/api/v1/llm/crewai-chat
/api/v1/generate-proposal
/api/v1/generate-proposal
/api/v1/generate-prd
/api/v1/generate-tech-spec

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->


[product-screenshot]: images/screenshot.png

