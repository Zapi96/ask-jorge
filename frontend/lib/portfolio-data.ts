/** Bilingual string — always pick with useLang() or .en / .es */
export type B = { en: string; es: string }

export interface Project {
  slug: string
  title: string
  subtitle: B
  description: B
  period: string
  client?: string
  role: string
  tags: string[]
  impact: B
  link?: string
  highlights: B[]
  featured?: boolean
}

export interface WorkEntry {
  slug: string
  role: string
  company: string
  companyShort?: string
  period: string
  current?: boolean
  description: B
  highlights: B[]
  tags: string[]
}

export interface Certification {
  title: string
  issuer: string
  year: string
  logo: string
  url: string
  description: B
  featured?: boolean
}

export interface Highlight {
  label: string
  description: B
}

export const PROJECTS: Project[] = [
  {
    slug: 'repsol-ai-platform',
    title: 'Repsol AI Platform',
    subtitle: {
      en: 'Enterprise MLOps at Scale',
      es: 'MLOps Empresarial a Gran Escala',
    },
    description: {
      en: 'Designed and led the corporate MLOps framework for Repsol on Databricks — automating the full ML lifecycle from experimentation to production, with self-service tooling, cost governance, and distributed training at scale.',
      es: 'Diseñé y lideré el framework corporativo de MLOps para Repsol sobre Databricks — automatizando el ciclo de vida completo de ML desde la experimentación hasta producción, con herramientas de autoservicio, gobernanza de costes y entrenamiento distribuido a gran escala.',
    },
    period: '2023 – present',
    client: 'Repsol (via Bluetab, an IBM Company)',
    role: 'Senior MLOps & AI Engineer',
    tags: ['Databricks', 'Azure', 'MLflow', 'Ray', 'FastAPI', 'Terraform', 'LangChain'],
    impact: {
      en: '40% reduction in time-to-production for ML models',
      es: 'Reducción del 40% en tiempo-de-producción de modelos ML',
    },
    highlights: [
      {
        en: 'Designed the corporate MLOps framework integrating MLflow + Unity Catalog for full model lineage, reproducibility, and governance across all Repsol AI teams.',
        es: 'Diseñé el framework corporativo de MLOps integrando MLflow + Unity Catalog para linaje completo de modelos, reproducibilidad y gobernanza en todos los equipos de AI de Repsol.',
      },
      {
        en: 'Built a self-service AI platform eliminating Service Now bottlenecks — teams can autonomously provision Search Indexes, Clusters, Key Vaults, and Managed Identities.',
        es: 'Construí una plataforma de AI de autoservicio que elimina los cuellos de botella de Service Now — los equipos pueden aprovisionar de forma autónoma Search Indexes, Clusters, Key Vaults e Identidades Gestionadas.',
      },
      {
        en: 'Developed a Ray wrapper library for distributed parallel training on Databricks, with Prometheus + Grafana monitoring — retaining critical workloads on the corporate platform.',
        es: 'Desarrollé una librería wrapper de Ray para entrenamiento paralelo distribuido en Databricks, con monitorización Prometheus + Grafana — reteniendo cargas de trabajo críticas en la plataforma corporativa.',
      },
      {
        en: 'Architected Databricks Asset Bundles (DABs) templates for deterministic IaC deployments of Jobs, Experiments, and Model Serving Endpoints.',
        es: 'Diseñé templates de Databricks Asset Bundles (DABs) para despliegues IaC deterministas de Jobs, Experiments y Model Serving Endpoints.',
      },
      {
        en: 'Built an active governance SDK using the Databricks API to audit naming conventions, billing tags, and cluster timeouts — reducing idle compute costs.',
        es: 'Construí un SDK de gobernanza activa usando la API de Databricks para auditar convenciones de nombres, etiquetas de facturación y timeouts de clusters — reduciendo costes de cómputo en reposo.',
      },
      {
        en: 'Integrated GPT Codex into CI/CD pipelines as an automated code quality and security reviewer before every deployment.',
        es: 'Integré GPT Codex en pipelines de CI/CD como revisor automatizado de calidad de código y seguridad antes de cada despliegue.',
      },
    ],
    featured: true,
  },
  {
    slug: 'national-mobility-intelligence',
    title: 'National Mobility Intelligence',
    subtitle: {
      en: 'Ministry of Transport — Spain',
      es: 'Ministerio de Transportes — España',
    },
    description: {
      en: 'Technical Lead for Spain\'s national mobility data platform at Nommon — I processed Orange mobile network data (CDR) to deliver daily movement matrices covering the entire country for the Ministry of Transport (MITMA).',
      es: 'Líder técnico de la plataforma nacional de datos de movilidad de España en Nommon — procesé datos de red móvil de Orange (CDR) para generar matrices de movimiento diarias cubriendo todo el país para el Ministerio de Transportes (MITMA).',
    },
    period: '2022 – 2023',
    client: 'MITMA (Ministry of Transport, Mobility and Urban Agenda)',
    role: 'Data Engineer & Technical Lead',
    tags: ['Python', 'GeoPandas', 'AWS', 'Docker', 'Streamlit', 'Open Trip Planner'],
    impact: {
      en: '100% daily delivery compliance for a national-scale project',
      es: '100% de cumplimiento en entregas diarias en un proyecto de escala nacional',
    },
    link: 'https://www.transportes.gob.es/ministerio/proyectos-singulares/estudio-de-movilidad-con-big-data',
    highlights: [
      {
        en: 'Led the end-to-end delivery of mobility matrices for all of Spain, coordinating weekly technical committees with the Ministry and managing SLAs of the highest demand.',
        es: 'Lideré la entrega end-to-end de matrices de movilidad para toda España, coordinando comités técnicos semanales con el Ministerio y gestionando SLAs de máxima exigencia.',
      },
      {
        en: 'Designed Voronoi-based algorithms to translate mobile antenna connection events (CDR from Orange) into precise geographic displacement vectors.',
        es: 'Diseñé algoritmos basados en Voronoi para traducir eventos de conexión a antenas móviles (CDR de Orange) en vectores precisos de desplazamiento geográfico.',
      },
      {
        en: 'Developed statistical imputation systems for telecom service outages, achieving 100% data continuity and eliminating critical reporting errors.',
        es: 'Desarrollé sistemas de imputación estadística para cortes de servicio de teleoperadoras, logrando 100% de continuidad de datos y eliminando errores críticos de reporting.',
      },
      {
        en: 'Built an AWS + Docker + Streamlit self-service infrastructure portal — adopted company-wide, saving ~16 hours/week of manual EC2 management.',
        es: 'Construí un portal de infraestructura de autoservicio AWS + Docker + Streamlit — adoptado en toda la empresa, ahorrando ~16 horas/semana de gestión manual de EC2.',
      },
      {
        en: 'Led intermodal mobility modeling for international clients in Santiago de Chile and Rio de Janeiro using Open Trip Planner (OTP).',
        es: 'Lideré la modelización de movilidad intermodal para clientes internacionales en Santiago de Chile y Río de Janeiro usando Open Trip Planner (OTP).',
      },
      {
        en: 'Corrected hundreds of geographic inconsistencies in territorial zoning using GeoPandas and Shapely, preventing a 20% bias in mobility matrices.',
        es: 'Corregí cientos de inconsistencias geográficas en la zonificación territorial con GeoPandas y Shapely, previniendo un sesgo del 20% en las matrices de movilidad.',
      },
    ],
    featured: false,
  },
  {
    slug: 'esa-gnss-research',
    title: 'ESA Galileo GNSS Research',
    subtitle: {
      en: 'European Space Agency & European Commission',
      es: 'Agencia Espacial Europea y Comisión Europea',
    },
    description: {
      en: 'Research engineer at GMV — I developed satellite occlusion simulation engines and signal analysis tools for the Galileo constellation, processing 100+ GB of telemetry data and leading a solo field mission on Helgoland island.',
      es: 'Ingeniero de investigación en GMV — desarrollé motores de simulación de ocultación satelital y herramientas de análisis de señal para la constelación Galileo, procesando más de 100 GB de datos de telemetría y liderando una misión de campo en solitario en la isla de Helgoland.',
    },
    period: '2020 – 2022',
    client: 'ESA · European Commission · DLR (German Aerospace Center)',
    role: 'Junior GNSS Data Engineer & Research Specialist',
    tags: ['Python', 'MATLAB', 'GIS', 'GNSS', 'NumPy', 'Matplotlib', 'Plotly'],
    impact: {
      en: '10 high-level technical reports delivered to ESA and DLR',
      es: '10 informes técnicos de alto nivel entregados a ESA y DLR',
    },
    highlights: [
      {
        en: 'Developed a satellite occlusion simulation engine to predict GNSS signal availability for drones in urban canyons (Brussels), integrating OpenStreetMap altimetry and LOS/NLOS line-of-sight analysis.',
        es: 'Desarrollé un motor de simulación de ocultación satelital para predecir la disponibilidad de señal GNSS para drones en cañones urbanos (Bruselas), integrando altimetría de OpenStreetMap y análisis de línea de visión LOS/NLOS.',
      },
      {
        en: 'Processed 100+ GB of raw satellite telemetry from Galileo (L1, L5, E1, E5), generating validated technical deliverables for the ESA and DLR using RMSE, MAE, and R² metrics.',
        es: 'Procesé más de 100 GB de telemetría satelital bruta de Galileo (L1, L5, E1, E5), generando entregables técnicos validados para ESA y DLR usando métricas RMSE, MAE y R².',
      },
      {
        en: 'Led a solo contingency field mission on Helgoland island — after a hardware failure cancelled the first expedition, independently managed logistics, diagnosed hardware on-site, and deployed three triangulation stations, making the system fully operational in 3 days.',
        es: 'Lideré una misión de campo de contingencia en solitario en la isla de Helgoland — tras el fallo de hardware que canceló la primera expedición, gestioné la logística de forma independiente, diagnostiqué el hardware in situ y desplegué tres estaciones de triangulación, poniendo el sistema operativo en 3 días.',
      },
      {
        en: 'Replicated Purdue University\'s orbit simulation methodology for real-time satellite ephemeris calculations.',
        es: 'Repliqué la metodología de simulación orbital de la Universidad de Purdue para cálculos de efemérides satelitales en tiempo real.',
      },
      {
        en: 'Participated in drone flight campaigns at the ATLAS Experimental Flight Center (Jaén) for wildfire suppression and agricultural inspection simulations.',
        es: 'Participé en campañas de vuelo de drones en el Centro Experimental de Vuelo ATLAS (Jaén) para simulaciones de supresión de incendios forestales e inspección agrícola.',
      },
      {
        en: 'Co-authored technical publications and research papers from ESA and European Commission projects presented at aerospace conferences.',
        es: 'Co-autor de publicaciones técnicas y artículos de investigación de proyectos de ESA y Comisión Europea presentados en conferencias aeroespaciales.',
      },
    ],
    featured: false,
  },
  {
    slug: 'urban-air-mobility-nasa',
    title: 'Urban Air Mobility Research',
    subtitle: {
      en: 'Purdue University × NASA',
      es: 'Purdue University × NASA',
    },
    description: {
      en: 'Graduate research at Purdue University School of Aeronautics — I modelled aerotaxi demand for Chicago\'s metropolitan area using Big Data analysis, ML clustering, and multimodal route optimization in collaboration with NASA research lines.',
      es: 'Investigación de posgrado en la Universidad de Purdue — modelé la demanda de aerotaxis para el área metropolitana de Chicago usando análisis de Big Data, clustering de ML y optimización de rutas multimodal en colaboración con líneas de investigación de la NASA.',
    },
    period: '2019 – 2020',
    client: 'Purdue University · NASA (collaborative research)',
    role: 'Graduate R&D Data Scientist',
    tags: ['Python', 'MATLAB', 'Java', 'Machine Learning', 'Big Data', 'Open Trip Planner'],
    impact: {
      en: 'Research validated by NASA; published at SciTech international conference',
      es: 'Investigación validada por NASA; publicada en conferencia internacional SciTech',
    },
    link: 'https://arc.aiaa.org/doi/10.2514/6.2021-1628',
    highlights: [
      {
        en: 'Processed large-scale urban mobility datasets integrating socioeconomic variables and traffic flows to predict aerotaxi adoption (Uber Elevate) in Chicago.',
        es: 'Procesé conjuntos de datos de movilidad urbana a gran escala integrando variables socioeconómicas y flujos de tráfico para predecir la adopción de aerotaxis (Uber Elevate) en Chicago.',
      },
      {
        en: 'Implemented unsupervised learning algorithms (K-means clustering) to identify optimal vertiport locations based on high-density population centroids.',
        es: 'Implementé algoritmos de aprendizaje no supervisado (clustering K-means) para identificar ubicaciones óptimas de vertipuertos basadas en centroides de alta densidad poblacional.',
      },
      {
        en: 'Developed Python and Java scripts to acquire multimodal transit data via the Open Trip Planner API, simulating door-to-door travel times for air vs. ground routes.',
        es: 'Desarrollé scripts en Python y Java para adquirir datos de tránsito multimodal mediante la API de Open Trip Planner, simulando tiempos de viaje puerta a puerta para rutas aéreas vs. terrestres.',
      },
      {
        en: 'Designed MATLAB optimization algorithms for efficient flight trajectory calculation (ascent, cruise, descent) minimising operational costs and travel time.',
        es: 'Diseñé algoritmos de optimización en MATLAB para el cálculo eficiente de trayectorias de vuelo (ascenso, crucero, descenso) minimizando costes operativos y tiempo de viaje.',
      },
      {
        en: 'Findings were validated in technical review meetings with NASA and contributed as a basis for agency-level research on Urban Air Mobility.',
        es: 'Los resultados fueron validados en reuniones de revisión técnica con la NASA y contribuyeron como base para la investigación de la agencia sobre Movilidad Aérea Urbana.',
      },
      {
        en: 'Graduated with a perfect GPA of 4.0/4.0, earning Dean\'s List and Semester Honors — top 1% of the cohort.',
        es: 'Me gradué con un GPA perfecto de 4.0/4.0, obteniendo Dean\'s List y Semester Honors — top 1% del cohorte.',
      },
    ],
    featured: false,
  },
]

export const EXPERIENCE: WorkEntry[] = [
  {
    slug: 'ml-professor-ceu',
    role: 'ML Professor — Business Analytics Master\'s',
    company: 'Universidad CEU San Pablo',
    companyShort: 'CEU San Pablo',
    period: 'Feb 2026 – present',
    current: true,
    description: {
      en: 'I lead the Machine Learning module as an adjunct professor in the Master\'s in Business Analytics for Strategic Management — bridging rigorous theory and real industry practice.',
      es: 'Lidero el módulo de Machine Learning como profesor adjunto en el Máster en Business Analytics para la Gestión Estratégica — conectando teoría rigurosa con práctica industrial real.',
    },
    highlights: [
      {
        en: 'Designed a 60-hour program covering supervised/unsupervised learning, ensemble methods, and Deep Learning fundamentals.',
        es: 'Diseñé un programa de 60 horas que cubre aprendizaje supervisado/no supervisado, métodos ensemble y fundamentos de Deep Learning.',
      },
      {
        en: 'I run hands-on labs on Databricks with Scikit-learn, instructing future analysts in end-to-end ML workflows.',
        es: 'Imparto laboratorios prácticos en Databricks con Scikit-learn, instruyendo a futuros analistas en flujos de trabajo ML end-to-end.',
      },
      {
        en: 'I mentor student capstone projects applying ML to real business datasets.',
        es: 'Mentorizo proyectos fin de máster de alumnos aplicando ML a datasets empresariales reales.',
      },
    ],
    tags: ['Machine Learning', 'Databricks', 'Python', 'Scikit-learn', 'Teaching'],
  },
  {
    slug: 'senior-mlops-bluetab',
    role: 'Senior MLOps & AI Engineer',
    company: 'Bluetab, an IBM Company — client: Repsol',
    companyShort: 'Bluetab / IBM',
    period: 'Mar 2025 – present',
    current: true,
    description: {
      en: 'Technical reference for MLOps on Repsol\'s AI Platform — I lead the end-to-end ML asset lifecycle across a Databricks + Azure stack, from experiment governance to production serving.',
      es: 'Referente técnico de MLOps en la Plataforma de AI de Repsol — lidero el ciclo de vida completo de activos ML en un stack Databricks + Azure, desde la gobernanza de experimentos hasta el serving en producción.',
    },
    highlights: [
      {
        en: '40% reduction in model time-to-production via standardised MLflow + Unity Catalog framework.',
        es: 'Reducción del 40% en tiempo-de-producción de modelos mediante el framework estandarizado MLflow + Unity Catalog.',
      },
      {
        en: 'Built Ray distributed training library with Prometheus + Grafana monitoring, retaining critical workloads on the corporate platform.',
        es: 'Construí la librería de entrenamiento distribuido Ray con monitorización Prometheus + Grafana, reteniendo cargas de trabajo críticas en la plataforma corporativa.',
      },
      {
        en: 'Led RAG + LangChain research initiatives and integrated GPT Codex into CI/CD pipelines for automated code auditing.',
        es: 'Lideré iniciativas de investigación RAG + LangChain e integré GPT Codex en pipelines CI/CD para auditoría automatizada de código.',
      },
    ],
    tags: ['Databricks', 'MLflow', 'Azure', 'Ray', 'LangChain', 'RAG', 'FastAPI', 'Terraform'],
  },
  {
    slug: 'mlops-engineer-bluetab',
    role: 'MLOps & Machine Learning Engineer',
    company: 'Bluetab, an IBM Company — client: Repsol',
    companyShort: 'Bluetab / IBM',
    period: 'Nov 2023 – Mar 2025',
    current: false,
    description: {
      en: 'I was responsible for productionising ML models and building the operational foundation of Repsol\'s AI platform, implementing quality tooling, drift monitoring, and the first Databricks Asset Bundles in the organisation.',
      es: 'Fui responsable de la puesta en producción de modelos ML y de la construcción de la base operacional de la plataforma de AI de Repsol, implementando herramientas de calidad, monitorización de drift y los primeros Databricks Asset Bundles de la organización.',
    },
    highlights: [
      {
        en: 'Led model deployment at scale using PySpark and MLflow, with automated data quality validation via Great Expectations and Evidently.',
        es: 'Lideré el despliegue de modelos a escala con PySpark y MLflow, con validación automática de calidad de datos mediante Great Expectations y Evidently.',
      },
      {
        en: 'Prototyped GenAI pipelines using Azure OpenAI and Llama2 for intelligent extraction from unstructured documents.',
        es: 'Prototipé pipelines de GenAI usando Azure OpenAI y Llama2 para extracción inteligente de documentos no estructurados.',
      },
      {
        en: 'Resolved a critical Azure infrastructure incident (Private Endpoints failure) that impacted all Repsol AI services, forcing Microsoft to acknowledge a global availability zone issue.',
        es: 'Resolví un incidente crítico de infraestructura Azure (fallo en Private Endpoints) que impactó a todos los servicios de AI de Repsol, forzando a Microsoft a reconocer un problema global de zona de disponibilidad.',
      },
    ],
    tags: ['PySpark', 'MLflow', 'Azure OpenAI', 'LLMs', 'DABs', 'Python', 'CI/CD'],
  },
  {
    slug: 'data-engineer-nommon',
    role: 'Data Engineer & Project Lead',
    company: 'Nommon Solutions and Technologies',
    companyShort: 'Nommon',
    period: 'Sep 2022 – Nov 2023',
    current: false,
    description: {
      en: 'Technical lead for mobility analytics at national scale — I was responsible for Spain\'s MITMA national mobility data project, delivering daily movement matrices and building internal infrastructure tooling.',
      es: 'Líder técnico de analítica de movilidad a escala nacional — fui responsable del proyecto nacional de datos de movilidad MITMA de España, entregando matrices de movimiento diarias y construyendo herramientas internas de infraestructura.',
    },
    highlights: [
      {
        en: '100% on-time delivery of national mobility matrices for the Spanish Ministry of Transport, leading weekly technical committees.',
        es: '100% de entregas puntuales de matrices de movilidad nacionales para el Ministerio de Transportes español, liderando comités técnicos semanales.',
      },
      {
        en: 'Built an AWS + Streamlit self-service infrastructure portal, saving ~16 hours/week of manual work — adopted by 100% of the company.',
        es: 'Construí un portal de infraestructura de autoservicio AWS + Streamlit, ahorrando ~16 horas/semana de trabajo manual — adoptado por el 100% de la empresa.',
      },
      {
        en: 'Developed geospatial algorithms processing Orange CDR data with Voronoi maps, achieving 100% data continuity via statistical imputation.',
        es: 'Desarrollé algoritmos geoespaciales procesando datos CDR de Orange con mapas de Voronoi, logrando 100% de continuidad de datos mediante imputación estadística.',
      },
    ],
    tags: ['Python', 'GeoPandas', 'AWS', 'Docker', 'Streamlit', 'OTP', 'GIS'],
  },
  {
    slug: 'gnss-engineer-gmv',
    role: 'Junior GNSS Data Engineer & Research Specialist',
    company: 'GMV',
    period: 'Jul 2020 – Sep 2022',
    current: false,
    description: {
      en: 'I specialised in satellite signal modelling and simulation for the Galileo constellation, delivering high-precision analytical systems for ESA, the European Commission, and DLR.',
      es: 'Me especialicé en modelado y simulación de señales satelitales para la constelación Galileo, entregando sistemas analíticos de alta precisión para ESA, la Comisión Europea y DLR.',
    },
    highlights: [
      {
        en: 'Built a GNSS occlusion simulation engine for drone navigation in urban environments, integrating GIS altimetry and LOS/NLOS analysis.',
        es: 'Construí un motor de simulación de ocultación GNSS para navegación de drones en entornos urbanos, integrando altimetría GIS y análisis LOS/NLOS.',
      },
      {
        en: 'Processed 100+ GB of satellite telemetry and delivered 10 high-level technical reports to ESA and DLR.',
        es: 'Procesé más de 100 GB de telemetría satelital y entregué 10 informes técnicos de alto nivel a ESA y DLR.',
      },
      {
        en: 'Led a solo contingency field mission on Helgoland island — deployed three triangulation stations in 3 days after hardware failure, saving the ESA test window.',
        es: 'Lideré una misión de campo de contingencia en solitario en la isla de Helgoland — desplegué tres estaciones de triangulación en 3 días tras un fallo de hardware, salvando la ventana de test de ESA.',
      },
    ],
    tags: ['Python', 'GNSS', 'GIS', 'MATLAB', 'Signal Analysis', 'NumPy'],
  },
  {
    slug: 'research-purdue',
    role: 'Graduate R&D Data Scientist — Urban Air Mobility',
    company: 'Purdue University',
    period: 'Aug 2019 – Jul 2020',
    current: false,
    description: {
      en: 'Graduate researcher at Purdue School of Aeronautics — I modelled aerotaxi demand for Chicago in collaboration with NASA research lines, using Big Data, ML, and multimodal optimisation.',
      es: 'Investigador de posgrado en la Escuela de Aeronáutica de Purdue — modelé la demanda de aerotaxis para Chicago en colaboración con líneas de investigación de la NASA, usando Big Data, ML y optimización multimodal.',
    },
    highlights: [
      {
        en: 'Predicted urban air mobility adoption using Big Data (socioeconomic + traffic flows) and K-means clustering for vertiport placement.',
        es: 'Predije la adopción de movilidad aérea urbana usando Big Data (flujos socioeconómicos + de tráfico) y clustering K-means para ubicación de vertipuertos.',
      },
      {
        en: 'Research validated by NASA in technical reviews and published at SciTech international conference.',
        es: 'Investigación validada por la NASA en revisiones técnicas y publicada en la conferencia internacional SciTech.',
      },
      {
        en: 'Graduated with GPA 4.0/4.0 — Dean\'s List and Semester Honors (top 1% of cohort).',
        es: 'Me gradué con GPA 4.0/4.0 — Dean\'s List y Semester Honors (top 1% del cohorte).',
      },
    ],
    tags: ['Python', 'MATLAB', 'Machine Learning', 'Big Data', 'NASA', 'Research'],
  },
]

export const CERTIFICATIONS: Certification[] = [
  {
    title: 'Azure Solutions Architect Expert',
    issuer: 'Microsoft',
    year: '2023',
    logo: '/logos/azure.svg',
    url: 'https://learn.microsoft.com/api/credentials/share/es-es/JorgeMartinezZapico-3570/D3312CF4172E2FDB?sharingId',
    description: {
      en: 'Expert-level credential validating the ability to design cloud and hybrid solutions on Azure aligned with the Well-Architected Framework. Covers identity, governance, data storage, and infrastructure design. Requires Azure Administrator Associate as prerequisite.',
      es: 'Credencial de nivel experto que valida la capacidad de diseñar soluciones cloud e híbridas en Azure alineadas con el Well-Architected Framework. Cubre identidad, gobernanza, almacenamiento de datos y diseño de infraestructura. Requiere Azure Administrator Associate como prerequisito.',
    },
    featured: true,
  },
  {
    title: 'Databricks Certified Machine Learning Professional',
    issuer: 'Databricks',
    year: '2024',
    logo: '/logos/databricks.svg',
    url: 'https://credentials.databricks.com/4175116c-b6f8-48ae-8048-f934c17dc182',
    description: {
      en: 'Advanced certification for designing enterprise-scale ML solutions on Databricks. Validates mastery of MLflow, Feature Store, automated retraining pipelines, and MLOps practices including monitoring and drift detection.',
      es: 'Certificación avanzada para diseñar soluciones ML a escala empresarial en Databricks. Valida el dominio de MLflow, Feature Store, pipelines de reentrenamiento automatizado y prácticas MLOps incluyendo monitorización y detección de drift.',
    },
    featured: true,
  },
  {
    title: 'Azure Administrator Associate',
    issuer: 'Microsoft',
    year: '2023',
    logo: '/logos/azure.svg',
    url: 'https://learn.microsoft.com/api/credentials/share/en-us/JorgeMartinezZapico-3570/A5522241800AECEB?sharingId',
    description: {
      en: 'Validates skills in implementing, managing, and monitoring Azure environments. Covers compute, storage, networking, and security administration at associate level. Prerequisite for the Azure Solutions Architect Expert.',
      es: 'Valida habilidades en implementación, gestión y monitorización de entornos Azure. Cubre administración de cómputo, almacenamiento, redes y seguridad a nivel associate. Prerequisito para Azure Solutions Architect Expert.',
    },
  },
  {
    title: 'Databricks Certified Machine Learning Associate',
    issuer: 'Databricks',
    year: '2023',
    logo: '/logos/databricks.svg',
    url: 'https://credentials.databricks.com/2adae64d-f829-41ee-bb37-358601b9c324',
    description: {
      en: 'Validates proficiency in core ML workflows on the Databricks platform using Spark ML and MLflow. Covers model training, experiment tracking, and foundational deployment concepts.',
      es: 'Valida la competencia en flujos de trabajo ML básicos en la plataforma Databricks usando Spark ML y MLflow. Cubre entrenamiento de modelos, seguimiento de experimentos y conceptos fundamentales de despliegue.',
    },
  },
  {
    title: 'Azure AI Fundamentals',
    issuer: 'Microsoft',
    year: '2024',
    logo: '/logos/azure.svg',
    url: 'https://learn.microsoft.com/api/credentials/share/es-es/JorgeMartinezZapico-3570/335AB53448DF309F?sharingId',
    description: {
      en: 'Foundational certification covering AI and machine learning concepts on Azure. Includes Azure AI services, responsible AI principles, and building AI-powered applications with Microsoft tooling.',
      es: 'Certificación fundacional que cubre conceptos de AI y machine learning en Azure. Incluye servicios Azure AI, principios de AI responsable y construcción de aplicaciones potenciadas por AI con herramientas de Microsoft.',
    },
  },
  {
    title: 'Databricks Certified Associate Developer for Apache Spark 3.0',
    issuer: 'Databricks',
    year: '2024',
    logo: '/logos/databricks.svg',
    url: 'https://credentials.databricks.com/7e6d7f62-96aa-4dab-b0ab-ae942225e3c2',
    description: {
      en: 'Certifies understanding of Spark architecture and the DataFrame API. Assesses ability to perform data transformations, aggregations, filtering, and optimisation in distributed Spark environments using Python or Scala.',
      es: 'Certifica el conocimiento de la arquitectura de Spark y la DataFrame API. Evalúa la capacidad para realizar transformaciones de datos, agregaciones, filtrado y optimización en entornos Spark distribuidos usando Python o Scala.',
    },
  },
  {
    title: 'Databricks Lakehouse Fundamentals',
    issuer: 'Databricks',
    year: '2024',
    logo: '/logos/databricks.svg',
    url: 'https://credentials.databricks.com/bc481869-090f-42f2-9999-9a8d7153129d',
    description: {
      en: 'Introduces the Lakehouse paradigm and the Databricks platform. Covers the Data Science & Engineering Workspace, Databricks SQL for analytics, and the fundamentals of ML workflows on a unified data platform.',
      es: 'Introduce el paradigma Lakehouse y la plataforma Databricks. Cubre el Data Science & Engineering Workspace, Databricks SQL para analítica y los fundamentos de los flujos de trabajo ML en una plataforma de datos unificada.',
    },
  },
]

export const ABOUT_HIGHLIGHTS: Highlight[] = [
  {
    label: 'GPA 4.0',
    description: {
      en: "Dean's List · Purdue University (top 1%)",
      es: "Dean's List · Purdue University (top 1%)",
    },
  },
  {
    label: '4 Cloud Certs',
    description: {
      en: 'Azure Expert + 3× Databricks Professional',
      es: 'Azure Expert + 3× Databricks Profesional',
    },
  },
  {
    label: 'Open to opportunities',
    description: {
      en: 'Available for senior roles in AI & MLOps',
      es: 'Disponible para roles senior en AI & MLOps',
    },
  },
]
