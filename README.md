<h1 align="center">Github Portfolio API Template</h1>

**This project is on development**

An open-source template for building a GitHub Portfolio website.
It’s designed to showcase your projects, repositories, and even sub-repos or organizations that don’t appear properly on your GitHub profile.

You can use it easily with a simple `JSON` file, no coding required!
Of course, you can still customize the UI/UX if you’d like.
This website is recommended to be deployed on **GitHub Pages**.

>Note: *This GitHub Portfolio is intended for showcasing public GitHub works only, not for private portfolios.*

---

## Feature

1. **No coding required, just write in JSON**

   Use `JSON` files as your data source. Simple and easy to modify.

   </br>


3. **Intregated with testing script**
   
   Run a testing script via your package manager to validate and check your JSON data. The script will display error, success, warning, or info messages depending on your input.

   **npm**:
   ```bash
   npm run test
   ```

   **yarn**:
   ```bash
   yarn test
   ```

   **pnpm**:
   ```bash
   pnpm test
   ```
   
   </br>

4. **Support for sub-repos and organizations**  (*coming soon*)

   This optional feature allows you to display repositories from organizations or sub-repos.
   It can be enabled during installation or manually later.
   
   </br>
   
5. **Built with vanilla technologies**
   
   Lightweight, high-performance, and completely dependency-free. Perfect for deploying on GitHub Pages.

   </br>

---

## How to Install

1. **GitHub**
   
   Download or clone this repository, it’s ready to use.

   GitHub:
   ```
   https://github.com/CatC0de1/github-portfolio-api-template
   ```

   Clone with:
   ```bash
   git clone https://github.com/CatC0de1/github-portfolio-api-template.git github-portfolio
   cd github-portfolio
   ```

   </br>

2. **Package Manager** (*coming soon*)
   
   This template will soon be available via npm, yarn, or pnpm.

   </br>

---

## Usage

1. **Fill Portfolio Data**

   You can add your portfolio data in two ways:

   - By editing the local `./data/projects.json` file, or
   - By providing an API endpoint that returns JSON from your GitHub repository’s root directory `./portfolio/index.json`.
  
   Both formats share the same JSON structure and you can use either or both methods.

   Additionally, the file `./data/config.json` must be filled in with your credentials and configuration settings.

   ---

   **config.json structure**

   |Field Name|Description|Requirement|Data Type|
   |----------|-----------|-----------|---------|
   |githubUsername|Your GitHub username|Required|String|
   |githubUrl|Your GitHub URL|Required|String, (URL)|
   |webTitle|website tilte|Optional|String|
   |title|Main title of the GitHub Portfolio|Optional|String|
   |subtitle|Sub title of the GitHub Portfolio|Optional|String|
   |themeColor|Website theme color|Optional (Default: `#0000FF`)|String, (CSS color format)|
   |useLocalJson|Set to true to read data from local JSON|Optional (Default: `true`)|Boolean|
   |email|Your contact email|Recommended|string (email)|
   |socialMedia|List of your social media accounts|Optional|Array of Objects|
   |socialMedia.name|Social media platform name|Required|String (enum: instagram, twitter, linkedin)|
   |socialMedia.url|Link to your social media|Required|String (URL)|

   Example:
   ```JSON
   {
      "githubUsername": "catc0de1",
      "githubUrl": "https://github.com/catc0de1",
      "webTitle": "GitHub Portfolio - catc0de1",
      "title": "My GitHub Portfolio",
      "subtitle": "A showcase of my repositories and creations",
      "themeColor": "#0000ff",
      "useLocalJson": true,
      "email": "youremail@example.com",
      "socialMedia": [
         {
            "name": "instagram",
            "url": "yourIgUrl"
         },
         {
            "name": "twitter",
            "url": "yourTwitterUrl"
          },
          {
            "name": "likendin",
            "url": "yourLinkedinUrl"
         }
      ],
   }

   ```

   ---

   **./data/project.json structure**:

   This file should contain an array of objects. Each object represents a project.

   |Field Name|Description|Requirement|Data Type|
   |----------|-----------|-----------|---------|
   |name|Project/repository name|Required|String|
   |description|Short description|Required|String|
   |fullDescription|Full description (shown in modal)|Optional, (default: `description`)|String|
   |projectUrl|Project/repository URL|Required||String, (URL)|
   |productUrl|Product/demo URL|Optional|String, (URL)|
   |techStack|List of technologies used|Required|Array of Objects|
   |techStack.name|Technology name, can see all list in **Tech Stack List**|Required|String|
   |thumbnailImage|Thumbnail image path|Optional|String|
   |thumbnailImageAlt|Alt text for thumbnail|Optional|String|
   |modalImages|Images displayed in modal|Optional (default: `thumbnailImage`)|Array of Objects|
   |modalImages.fileName|Image path|Required|String|
   |modalImages.alt|Alt text|Optional|String|

   Example:
   ```JSON
   [
      {
         "name": "Portfolio Website",
         "description": "My personal portfolio as Informatic Engineering",
         "fullDescription": "This website show all my works as Informatic Engineering and it build perfectly that reference how skilled I am",
         "projectUrl": "https://github.com/catc0de1/portfolio",
         "productUrl": "https://iyan-zuli-armanda.netlify.app",
         "techStack": [
            { "name": "react" },
            { "name": "tailwind" },
            { "name": "vite" },
            { "name": "ts" }
         ],
         "thumbnailImage": "portfolio.webp",
         "thumbnailImageAlt": "Start page of my portfolio website",
         "modalImages": [
            {
               "fileName": "portfolio.webp",
               "alt": "Review of portfolio page 1"
            },
            { 
               "fileName": "my_diary.webp",
               "alt": "Review of portfolio page 2"
            },
            { 
               "fileName": "software_techs_portal.webp",
               "alt": "Review of portfolio page 3"
            }
         ]
      },
      {
         "name": "Surabaya BestPoint",
         "description": "Directory Listing App, show all best point in Surabaya",
         "projectUrl": "https://github.com/catc0de1/SurabayaBestPoint",
         "productUrl": "https://iyan-zuli-armanda.netlify.app",
         "techStack": [
            { "name": "express" },
            { "name": "mongodb" },
            { "name": "mongoose" },
            { "name": "ejs" },
            { "name": "bootstrap" },
            { "name": "js" }
         ],
         "thumbnailImage": "directory_listing_app.webp"
      }
   ]
   ```

   **Images**
   
   - It’s recommended to use **.webp** format for better performance.
   - In this template, store images inside the `./images` directory.
   - If using an API, store them in the same directory as the JSON (`./portfolio`).
   - Use **kebab-case** or **snake_case** for consistent file naming.

   **Tech Stack List**

   Use the value of `techStack.name` from the list below:

   |Tech Stack|value|
   |----------|-----|
   |.NET|dotnet|
   |AdonisJS|adonis|
   |Alpine.js|alpine|
   |Angular|angular|
   |Astro|astro|
   |Bootstrap|bootstrap|
   |C|c|
   |C++|cpp|
   |CMake|cmake|
   |Dart|dart|
   |Debian|debian|
   |Docker|docker|
   |EJS|ejs|
   |Express|express|
   |Flutter|flutter|
   |Framer|framer|
   |Git|git|
   |GitHub|github|
   |GitHub Action|github-action|
   |GitLab|gitlab|
   |Gradle|gradle|
   |GraphQL|graphql|
   |Handlebars.js|hbs|
   |HTML5|html|
   |htmx|htmx|
   |JavaScript|js|
   |Jest|jest|
   |Kali Linux|kali|
   |Kotlin|kotlin|
   |Linux|linux|
   |Markdown|md|
   |Linux Mint|mint|
   |MongoDB|mongodb|
   |MySQL|mysql|
   |NestJS|nestjs|
   |Netlify|netlify|
   |NGINX|nginx|
   |Node.js|nodejs|
   |npm|npm|
   |Nx|nx|
   |OpenCV|opencv|
   |pnpm|pnpm|
   |PostgreSQL|postgres|
   |Postman|postman|
   |Prisma|prisma|
   |Python|py|
   |Qt|qt|
   |React|react|
   |React Native|react-native|
   |Redis|redis|
   |Rust|rust|
   |Sass|sass|
   |SQLite|sqlite|
   |Swagger|swagger|
   |Tailwind CSS|tailwind|
   |Tauri|tauri|
   |Three.js|threejs|
   |TypeScript|ts|
   |TypeORM|typeorm|
   |Vim|vim|
   |Vite|vite|
   |Vitest|vitest|
   |Webpack|webpack|
   |Yarn|yarn|

   You can add custom technologies in `./components/techBranc.js`

   </br>

2. **Deploying**

   This GitHub Portfolio template is ideal for GitHub Pages.
   Just deploy from the root directory, since it already includes an `index.html` file.

   </br>

---

## Author

This github-portfolio-api-template is created by **catc0de1**.

Feel free to connect:
- **GitHub**: [catc0de1](https://github.com/catc0de1)
- **Instagram**: [@iyan_zul1](https://www.instagram.com/iyan_zul1/)
- **Linkedin**: [iyan-zuli-armanda](https://www.linkedin.com/in/iyan-zuli-armanda-8a1383296/)

---

## LICENSE

This template is [MIT LICENSED](https://github.com/CatC0de1/github-portfolio-api-template?tab=MIT-1-ov-file)

---

Please leave a star and it free to contribute.
Hope you enjoy it ^-^

---

Powered by:

<p align="center">
<svg role="img" color="#E34F26" width="60" hegiht="60" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"/></svg>
<svg role="img" color="#663399" width="60" hegiht="60" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0v20.16A3.84 3.84 0 0 0 3.84 24h16.32A3.84 3.84 0 0 0 24 20.16V3.84A3.84 3.84 0 0 0 20.16 0Zm14.256 13.08c1.56 0 2.28 1.08 2.304 2.64h-1.608c.024-.288-.048-.6-.144-.84-.096-.192-.288-.264-.552-.264-.456 0-.696.264-.696.84-.024.576.288.888.768 1.08.72.288 1.608.744 1.92 1.296q.432.648.432 1.656c0 1.608-.912 2.592-2.496 2.592-1.656 0-2.4-1.032-2.424-2.688h1.68c0 .792.264 1.176.792 1.176.264 0 .456-.072.552-.24.192-.312.24-1.176-.048-1.512-.312-.408-.912-.6-1.32-.816q-.828-.396-1.224-.936c-.24-.36-.36-.888-.36-1.536 0-1.44.936-2.472 2.424-2.448m5.4 0c1.584 0 2.304 1.08 2.328 2.64h-1.608c0-.288-.048-.6-.168-.84-.096-.192-.264-.264-.528-.264-.48 0-.72.264-.72.84s.288.888.792 1.08c.696.288 1.608.744 1.92 1.296.264.432.408.984.408 1.656.024 1.608-.888 2.592-2.472 2.592-1.68 0-2.424-1.056-2.448-2.688h1.68c0 .744.264 1.176.792 1.176.264 0 .456-.072.552-.24.216-.312.264-1.176-.048-1.512-.288-.408-.888-.6-1.32-.816-.552-.264-.96-.576-1.2-.936s-.36-.888-.36-1.536c-.024-1.44.912-2.472 2.4-2.448m-11.031.018c.711-.006 1.419.198 1.839.63.432.432.672 1.128.648 1.992H9.336c.024-.456-.096-.792-.432-.96-.312-.144-.768-.048-.888.24-.12.264-.192.576-.168.864v3.504c0 .744.264 1.128.768 1.128a.65.65 0 0 0 .552-.264c.168-.24.192-.552.168-.84h1.776c.096 1.632-.984 2.712-2.568 2.688-1.536 0-2.496-.864-2.472-2.472v-4.032c0-.816.24-1.44.696-1.848.432-.408 1.146-.624 1.857-.63"/></svg>
<svg role="img" color="#F7DF1E" width="60" hegiht="60" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/></svg>
</p>