-- CreateTable
CREATE TABLE "tbl_usuario" (
    "cveusuario" SERIAL NOT NULL,
    "nombre" VARCHAR(250) NOT NULL,
    "apellido" VARCHAR(600) NOT NULL,
    "username" VARCHAR(150) NOT NULL,
    "password" VARCHAR(800) NOT NULL,
    "email" VARCHAR(250) NOT NULL,
    "fecharegistro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tbl_usuario_pkey" PRIMARY KEY ("cveusuario")
);

-- CreateTable
CREATE TABLE "tbl_rol" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(50) NOT NULL,

    CONSTRAINT "tbl_rol_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserRoles" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "tbl_usuario_username_key" ON "tbl_usuario"("username");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_usuario_email_key" ON "tbl_usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_rol_nombre_key" ON "tbl_rol"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "_UserRoles_AB_unique" ON "_UserRoles"("A", "B");

-- CreateIndex
CREATE INDEX "_UserRoles_B_index" ON "_UserRoles"("B");

-- AddForeignKey
ALTER TABLE "_UserRoles" ADD CONSTRAINT "_UserRoles_A_fkey" FOREIGN KEY ("A") REFERENCES "tbl_rol"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserRoles" ADD CONSTRAINT "_UserRoles_B_fkey" FOREIGN KEY ("B") REFERENCES "tbl_usuario"("cveusuario") ON DELETE CASCADE ON UPDATE CASCADE;
