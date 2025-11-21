-- CreateTable
CREATE TABLE `abastecimento_veiculo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `veiculo_id` INTEGER NOT NULL,
    `data` DATE NULL,
    `fornecedor` VARCHAR(100) NULL,
    `combustivel_id` INTEGER NULL,
    `litros` DECIMAL(10, 2) NULL,
    `valor` DECIMAL(10, 2) NULL,

    INDEX `fk_abastecimento_combustivel`(`combustivel_id`),
    INDEX `idx_abastecimento_veiculo`(`veiculo_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categoria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `classificacao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `combustivel` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `companhia` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `documento_veiculo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `veiculo_id` INTEGER NOT NULL,
    `tipo` VARCHAR(100) NOT NULL,
    `arquivo` VARCHAR(255) NULL,
    `vencimento` DATE NULL,
    `antecipacao` BOOLEAN NULL DEFAULT false,
    `dias_para_vencimento` INTEGER NULL,
    `criado_em` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `idx_doc_veiculo_veiculo`(`veiculo_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `imagem_veiculo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `veiculo_id` INTEGER NOT NULL,
    `url` VARCHAR(255) NOT NULL,
    `criado_em` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `idx_imagem_veiculo_veiculo`(`veiculo_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `marca` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ocorrencia_veiculo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `veiculo_id` INTEGER NOT NULL,
    `data` DATE NULL,
    `classificacao_id` INTEGER NULL,
    `seriedade_id` INTEGER NULL,
    `descricao` TEXT NULL,
    `anexo` VARCHAR(255) NULL,

    INDEX `fk_ocorrencia_classificacao`(`classificacao_id`),
    INDEX `fk_ocorrencia_seriedade`(`seriedade_id`),
    INDEX `idx_ocorrencia_veiculo`(`veiculo_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `seriedade_ocorrencia` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tipo_ocorrencia` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tipo_placa` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(100) NOT NULL,
    `email` VARCHAR(150) NOT NULL,

    UNIQUE INDEX `uk_usuario_email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `veiculo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `criado_em` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `identificador` VARCHAR(100) NULL,
    `companhia_id` INTEGER NULL,
    `status` ENUM('pendente', 'cancelado', 'liberado') NULL DEFAULT 'pendente',
    `modelo` VARCHAR(100) NULL,
    `ano` INTEGER NULL,
    `marca_id` INTEGER NULL,
    `categoria_id` INTEGER NULL,
    `classificacao_id` INTEGER NULL,
    `capacidade` INTEGER NULL,
    `portais` INTEGER NULL,
    `estado` VARCHAR(50) NULL,
    `uf` CHAR(2) NULL,
    `tipo_placa_id` INTEGER NULL,
    `placa` VARCHAR(20) NULL,
    `renavam` VARCHAR(20) NULL,
    `chassi` VARCHAR(30) NULL,
    `revisao_km` INTEGER NULL,
    `combustivel_id` INTEGER NULL,
    `descricao` TEXT NULL,
    `usuario_id` INTEGER NULL,

    INDEX `fk_veiculo_categoria`(`categoria_id`),
    INDEX `fk_veiculo_classificacao`(`classificacao_id`),
    INDEX `fk_veiculo_combustivel`(`combustivel_id`),
    INDEX `fk_veiculo_companhia`(`companhia_id`),
    INDEX `fk_veiculo_marca`(`marca_id`),
    INDEX `fk_veiculo_tipo_placa`(`tipo_placa_id`),
    INDEX `fk_veiculo_usuario`(`usuario_id`),
    INDEX `idx_veiculo_identificador`(`identificador`),
    INDEX `idx_veiculo_placa`(`placa`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `abastecimento_veiculo` ADD CONSTRAINT `fk_abastecimento_combustivel` FOREIGN KEY (`combustivel_id`) REFERENCES `combustivel`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `abastecimento_veiculo` ADD CONSTRAINT `fk_abastecimento_veiculo_veiculo` FOREIGN KEY (`veiculo_id`) REFERENCES `veiculo`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `documento_veiculo` ADD CONSTRAINT `fk_doc_veiculo_veiculo` FOREIGN KEY (`veiculo_id`) REFERENCES `veiculo`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `imagem_veiculo` ADD CONSTRAINT `fk_img_veiculo_veiculo` FOREIGN KEY (`veiculo_id`) REFERENCES `veiculo`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ocorrencia_veiculo` ADD CONSTRAINT `fk_ocorrencia_classificacao` FOREIGN KEY (`classificacao_id`) REFERENCES `tipo_ocorrencia`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ocorrencia_veiculo` ADD CONSTRAINT `fk_ocorrencia_seriedade` FOREIGN KEY (`seriedade_id`) REFERENCES `seriedade_ocorrencia`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ocorrencia_veiculo` ADD CONSTRAINT `fk_ocorrencia_veiculo_veiculo` FOREIGN KEY (`veiculo_id`) REFERENCES `veiculo`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `veiculo` ADD CONSTRAINT `fk_veiculo_categoria` FOREIGN KEY (`categoria_id`) REFERENCES `categoria`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `veiculo` ADD CONSTRAINT `fk_veiculo_classificacao` FOREIGN KEY (`classificacao_id`) REFERENCES `classificacao`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `veiculo` ADD CONSTRAINT `fk_veiculo_combustivel` FOREIGN KEY (`combustivel_id`) REFERENCES `combustivel`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `veiculo` ADD CONSTRAINT `fk_veiculo_companhia` FOREIGN KEY (`companhia_id`) REFERENCES `companhia`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `veiculo` ADD CONSTRAINT `fk_veiculo_marca` FOREIGN KEY (`marca_id`) REFERENCES `marca`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `veiculo` ADD CONSTRAINT `fk_veiculo_tipo_placa` FOREIGN KEY (`tipo_placa_id`) REFERENCES `tipo_placa`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `veiculo` ADD CONSTRAINT `fk_veiculo_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuario`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
