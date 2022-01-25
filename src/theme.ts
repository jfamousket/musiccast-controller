export const theme = {
  name: "HPE 0",
  rounding: 0,
  spacing: 24,
  defaultMode: "dark",
  global: {
    colors: {
      "accent-1": "#2AD2C9",
      "accent-2": "#614767",
      "accent-3": "#ff8d6d",
      brand: "#01a982",
      background: {
        dark: "#111111",
        light: "#FFFFFF",
      },
      "neutral-1": "#425563",
      "neutral-2": "#5F7A76",
      "neutral-3": "#80746E",
      "neutral-4": "#767676",
      text: {
        dark: "#EEEEEE",
        light: "#333333",
      },
      control: "brand",
      "status-critical": "#F04953",
      "status-warning": "#FFD144",
      "status-ok": "brand",
      "status-unknown": "#CCCCCC",
      "status-disabled": "#CCCCCC",
    },
    font: {
      family: "'Metric'",
      face: '@font-face {\n  font-family: "Metric";\n  src: url("https://hpefonts.s3.amazonaws.com/web/MetricHPE-Web-Regular.woff") format(\'woff\');\n}\n\n@font-face {\n  font-family: "Metric";\n  src: url("https://hpefonts.s3.amazonaws.com/web/MetricHPE-Web-Bold.woff") format(\'woff\');\n  font-weight: 700;\n}\n\n@font-face {\n  font-family: "Metric";\n  src: url("https://hpefonts.s3.amazonaws.com/web/MetricHPE-Web-Semibold.woff") format(\'woff\');\n  font-weight: 600;\n}\n\n@font-face {\n  font-family: "Metric";\n  src: url("https://hpefonts.s3.amazonaws.com/web/MetricHPE-Web-Light.woff") format(\'woff\');\n  font-weight: 100;\n}',
    },
    control: {
      border: {
        radius: "0px",
      },
    },
    drop: {
      border: {
        radius: "0px",
      },
    },
    active: {
      background: "active-background",
      color: "active-text",
    },
    hover: {
      background: "active-background",
      color: "active-text",
    },
    selected: {
      background: "selected-background",
      color: "selected-text",
    },
  },
  anchor: {
    textDecoration: "underline",
    color: {
      dark: "#FFFFFF",
      light: "#000000",
    },
  },
  button: {
    border: {
      radius: "0px",
    },
    colors: {
      accent: "#ff8d6d",
      secondary: "rgba(51,51,51,0.6)",
    },
    extend: "letter-spacing: 0.04167em;",
  },
  clock: {
    analog: {
      second: {
        color: {
          dark: "#01a982",
          light: "#01a982",
        },
      },
    },
  },
  layer: {
    background: {
      dark: "#111111",
      light: "#FFFFFF",
    },
  },
  chart: {},
  meter: {},
  diagram: {
    line: {},
  },
  email: "eric.soderberg@hpe.com",
  date: "2020-03-24T17:34:04.000Z",
};
