const getEnvironmentVariable = (environmentVariable: string): string => {
    const unvalidatedEnvironmentVariable = process.env[environmentVariable];
    if (!unvalidatedEnvironmentVariable) {
      throw new Error(
        `Couldn't find environment variable: ${environmentVariable}`
      );
    } else {
      return unvalidatedEnvironmentVariable;
    }
  };
  
  export const config = {
    mail: getEnvironmentVariable("MAIL"),
    password: getEnvironmentVariable("PASSWORD"),
    api_key: getEnvironmentVariable("SENDGRID_API_KEY")
  };
  