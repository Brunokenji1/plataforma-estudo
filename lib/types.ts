export type Dificuldade = 'iniciante' | 'intermediario' | 'avancado';

export type LicaoMeta = {
  slug: string;
  titulo: string;
  duracaoMin: number;
  dificuldade: Dificuldade;
  prerequisitos?: string[];
};

export type Trilha = {
  slug: string;
  titulo: string;
  descricao: string;
  cor: string;
  licoes: LicaoMeta[];
};

export type TrilhaMetaLicao = {
  slug: string;
  ordem: number;
  prerequisitos?: string[];
};

export type Licao = LicaoMeta & {
  trilha: string;
  referencias?: string[];
  content: string;
};

export type TipoExercicio = 'multipla-escolha' | 'verdadeiro-falso' | 'codigo';

export type Exercicio = {
  id: string;
  enunciado: string;
  tipo: TipoExercicio;
  opcoes?: string[];
  resposta: string | number;
  explicacao: string;
};

export type TrilhaMetaFile = {
  titulo: string;
  descricao: string;
  cor?: string;
  licoes: TrilhaMetaLicao[];
};

export type LicaoFrontmatter = {
  titulo: string;
  trilha: string;
  duracaoMin: number;
  dificuldade: Dificuldade;
  prerequisitos?: string[];
  referencias?: string[];
};
