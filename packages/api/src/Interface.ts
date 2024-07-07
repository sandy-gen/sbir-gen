
export interface ICredential {
    inputs: any
    id: string
    name: string
    credentialName: string
    encryptedData: string
    createdDate: Date
    updatedDate: Date
}

export interface IComponentCredentials {
    [key: string]: ICredential
}
export interface ICommonObject {
    [key: string]: any
}

export type IDatabaseEntity = {
    [key: string]: any
}

export type ICredentialDataDecrypted = ICommonObject

// Plain credential object sent to server
export interface ICredentialReqBody {
    name: string
    credentialName: string
    plainDataObj: ICredentialDataDecrypted
}

// Decrypted credential object sent back to client
export interface ICredentialReturnResponse extends ICredential {
    plainDataObj: ICredentialDataDecrypted
}


export interface UserInputData {
    product_name: string;
    tagline: string;
    agency: string;
    program: string;
    sbir_num: string;
    company: string;
    topic_number: string;
    topic_title: string;
    tech_focus: string;
    proposal_number: string;
    project_overview: string;
    project_technical_merit: string;
    project_team: string;
    project_commercialization: string;
    technical_problem: string;
    significance: string;
    solution: string;
    problem_quote: string;
    problem_quote_author: string;
  }
  
  export interface Config {
    replacements: {
      [key: string]: {
        fields: {
          [placeholder: string]: keyof UserInputData;
        };
      };
    };
    images?: {
      [key: string]: Array<{ url: string; left: number; top: number; width: number }>;
    };
  }
