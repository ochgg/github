-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-06-2023 a las 20:02:53
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `redrocket`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `admin`
--

CREATE TABLE `admin` (
  `id_admin` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `admin`
--

INSERT INTO `admin` (`id_admin`, `user_id`, `status`) VALUES
(1, 22, 1),
(2, 25, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `feedback`
--

CREATE TABLE `feedback` (
  `id_feedback` int(11) NOT NULL,
  `id_user_envia` int(11) NOT NULL,
  `id_user_recive` int(11) NOT NULL,
  `feedback` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `feedback`
--

INSERT INTO `feedback` (`id_feedback`, `id_user_envia`, `id_user_recive`, `feedback`) VALUES
(1, 22, 24, 'Excelente trabajo.'),
(2, 22, 25, 'Excelente trabajo.'),
(3, 22, 1, 'excelente trabajo en equipo'),
(4, 22, 3, 'excelente trabajo en equipo'),
(5, 22, 4, 'Excelente trabajo'),
(6, 22, 9, 'Buen trabajo'),
(7, 22, 6, 'Buen trabajo'),
(8, 22, 15, 'eres genial'),
(9, 22, 7, 'eres genial'),
(10, 22, 12, 'Hoal excelnte amigo'),
(11, 22, 14, 'buen equipo de trabajo'),
(12, 22, 2, 'gdef'),
(13, 22, 17, 'hola que bien'),
(14, 22, 16, 'El trabaja bien');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `follow`
--

CREATE TABLE `follow` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `followed_id` int(11) NOT NULL,
  `create_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `follow`
--

INSERT INTO `follow` (`id`, `user_id`, `followed_id`, `create_at`) VALUES
(1, 23, 15, '2023-05-28 17:28:57'),
(2, 15, 23, '2023-05-28 17:43:30'),
(3, 16, 1, '2023-05-29 01:33:00'),
(4, 1, 16, '2023-05-29 01:33:00'),
(5, 20, 16, '2023-05-29 01:34:02'),
(6, 16, 7, '2023-05-29 01:34:02'),
(7, 16, 2, '2023-05-29 01:34:25'),
(8, 16, 7, '2023-05-29 01:35:26'),
(9, 16, 9, '2023-05-29 01:35:26'),
(10, 16, 24, '2023-05-29 01:36:08'),
(11, 24, 16, '2023-05-29 01:36:08'),
(12, 16, 25, '2023-05-29 01:37:15'),
(13, 16, 22, '2023-05-29 01:37:15'),
(14, 23, 16, '2023-05-29 01:42:16'),
(15, 1, 16, '2023-05-29 01:42:16'),
(16, 19, 14, '2023-05-29 15:51:39'),
(17, 8, 19, '2023-05-29 15:51:39'),
(24, 25, 1, '2023-06-08 13:27:40'),
(25, 25, 7, '2023-06-08 13:39:42'),
(26, 22, 24, '2023-06-08 15:51:49'),
(31, 22, 4, '2023-06-08 20:08:31'),
(32, 22, 5, '2023-06-08 20:09:04'),
(35, 22, 25, '2023-06-08 20:50:02'),
(38, 22, 1, '2023-06-12 12:52:19'),
(39, 18, 2, '2023-06-12 14:45:53'),
(40, 18, 3, '2023-06-12 14:45:54'),
(41, 18, 4, '2023-06-12 14:46:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `publication`
--

CREATE TABLE `publication` (
  `id` int(11) NOT NULL,
  `text` varchar(500) NOT NULL,
  `file` varchar(200) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `publication`
--

INSERT INTO `publication` (`id`, `text`, `file`, `created_at`, `user_id`) VALUES
(1, 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. ', '', '2023-05-28 12:51:50', 16),
(2, '¿De dónde viene?\r\nAl contrario del pensamiento popular, el texto de Lorem Ipsum no es simplemente texto aleatorio. Tiene sus raices en una pieza cl´sica de la literatura del Latin, que data del año 45 antes de Cristo, haciendo que este adquiera mas de 2000 años de antiguedad', '', '2023-05-28 16:38:05', 23),
(3, '¿Por qué lo usamos?\r\nEs un hecho establecido hace demasiado tiempo que un lector se distraerá con el contenido del texto de un sitio mientras que mira su diseño. El punto de usar Lorem Ipsum es que tiene una distribución más o menos normal de las letras, al contrario de usar textos como por ejemplo \"Contenido aquí, contenido aquí\". Estos textos hacen parecerlo un español que se puede leer.', '', '2023-05-28 16:39:22', 16),
(6, 'esto es una prueba2', '', '2023-06-08 13:35:49', 25),
(8, 'esto es una prueba4', '', '2023-06-08 13:35:49', 25),
(11, 'esto es una prueba1', '', '2023-06-08 13:41:12', 1),
(26, 'Hola esto es una prueba de la prueba', NULL, '2023-06-10 20:05:34', 22),
(27, 'Hoy es un día muy bonito', NULL, '2023-06-10 20:45:16', 22),
(35, 'Hola este red social es muy buena.', NULL, '2023-06-11 18:44:31', 22),
(36, 'Hola como estas?', NULL, '2018-06-07 18:45:28', 22),
(37, 'Hola espero estén bien en este día. Saludos a todos mis seguidores', NULL, '2023-06-12 12:38:36', 1),
(38, 'Esto es una prueba', NULL, '2023-06-12 14:46:08', 18),
(39, 'Hola todo esto es una nueva prueba', NULL, '2023-06-12 17:49:00', 22),
(40, 'Hola a todos de nuevo', NULL, '2023-06-12 17:50:04', 1),
(41, 'Hola a todos de nuevo', NULL, '2023-06-12 17:52:31', 2),
(42, 'Hola a todos de nuevo', NULL, '2023-06-12 17:52:31', 3),
(43, 'Hola a todos de nuevo', NULL, '2023-06-12 17:52:31', 4),
(44, 'Hola a todos de nuevo', NULL, '2023-06-12 17:52:31', 5),
(45, 'Hola a todos de nuevo', NULL, '2023-06-12 17:52:31', 6),
(46, 'Hola a todos de nuevo', NULL, '2023-06-12 17:52:31', 7),
(47, 'Hola a todos de nuevo', NULL, '2023-06-12 17:52:31', 8),
(48, 'Hola a todos de nuevo', NULL, '2023-06-12 17:52:31', 9),
(49, 'Hola a todos de nuevo', NULL, '2023-06-12 17:52:31', 10),
(50, 'Hola a todos de nuevo', NULL, '2023-06-12 17:52:31', 11),
(51, 'Hola a todos de nuevo', NULL, '2023-06-12 17:52:31', 12),
(52, 'Hola a todos de nuevo', NULL, '2023-06-12 17:52:31', 13),
(53, 'Hola a todos de nuevo', NULL, '2023-06-12 17:52:31', 14),
(54, 'Hola a todos de nuevo', NULL, '2023-06-12 17:52:31', 15),
(55, 'Hola a todos de nuevo', NULL, '2023-06-12 17:52:31', 16),
(56, 'Hola a todos de nuevo', NULL, '2023-06-12 17:52:31', 17),
(57, 'Hola a todos de nuevo', NULL, '2023-06-12 17:52:31', 18),
(58, 'Hola a todos de nuevo', NULL, '2023-06-12 17:52:31', 19),
(59, 'Hola a todos de nuevo', NULL, '2023-06-12 17:52:31', 20),
(60, 'Hola a todos de nuevo', NULL, '2023-06-12 17:52:31', 21),
(61, 'Hola a todos de nuevo', NULL, '2023-06-12 17:52:31', 22),
(62, 'Hola a todos de nuevo', NULL, '2023-06-12 17:52:31', 23),
(63, 'Hola a todos de nuevo', NULL, '2023-06-12 17:52:31', 24),
(64, 'Hola a todos de nuevo', NULL, '2023-06-12 17:52:31', 25),
(65, 'Hola a todos de nuevo', NULL, '2023-06-12 17:52:31', 2),
(66, 'Hola a todos de nuevo', NULL, '2023-06-12 17:52:31', 3),
(67, 'Hola a todos de nuevo', NULL, '2023-06-12 17:52:31', 4),
(68, 'Hola a todos de nuevo', NULL, '2023-06-12 17:52:31', 5),
(69, 'Hola a todos de nuevo', NULL, '2023-06-12 17:52:31', 6),
(70, 'Hola a todos de nuevo', NULL, '2023-06-12 17:52:31', 7),
(71, 'Hola a todos de nuevo', NULL, '2023-06-12 17:52:31', 8),
(72, 'Hola a todos de nuevo', NULL, '2023-06-12 17:52:31', 9),
(73, 'Hola a todos de nuevo', NULL, '2023-06-12 17:52:31', 10),
(74, 'Hola a todos de nuevo', NULL, '2023-06-12 17:52:31', 11),
(75, 'Hola a todos de nuevo', NULL, '2023-06-12 17:52:31', 12),
(76, 'Hola a todos de nuevo', NULL, '2023-06-12 17:52:31', 13),
(77, 'Hola a todos de nuevo', NULL, '2023-06-12 17:52:31', 14),
(78, 'Hola a todos de nuevo', NULL, '2023-06-12 17:52:31', 15),
(79, 'Hola a todos de nuevo', NULL, '2023-06-12 17:52:31', 16),
(80, 'Hola a todos de nuevo', NULL, '2023-06-12 17:52:31', 17),
(81, 'Hola a todos de nuevo', NULL, '2023-06-12 17:52:31', 18),
(82, 'Hola a todos de nuevo', NULL, '2023-06-12 17:52:31', 19),
(83, 'Hola a todos de nuevo', NULL, '2023-06-12 17:52:31', 20),
(84, 'Hola a todos de nuevo', NULL, '2023-06-12 17:52:31', 21),
(85, 'Hola a todos de nuevo', NULL, '2023-06-12 17:52:31', 22),
(86, 'Hola a todos de nuevo', NULL, '2023-06-12 17:52:31', 23),
(87, 'Hola a todos de nuevo', NULL, '2023-06-12 17:52:31', 24),
(88, 'Hola a todos de nuevo', NULL, '2023-06-12 17:52:31', 25),
(89, 'Hola a todos de nuevo', NULL, '2023-06-12 17:52:31', 2),
(90, 'Hola a todos de nuevo', NULL, '2023-06-12 17:52:31', 3),
(91, 'Hola a todos de nuevo', NULL, '2023-06-12 17:52:31', 4),
(92, 'Hola a todos de nuevo', NULL, '2023-06-12 17:52:31', 5),
(93, 'Hola a todos de nuevo', NULL, '2023-06-12 17:52:31', 6),
(94, 'Hola a todos de nuevo', NULL, '2023-06-12 17:52:31', 7),
(95, 'Hola a todos de nuevo', NULL, '2023-06-12 17:52:31', 8),
(96, 'Hola a todos de nuevo', NULL, '2023-06-12 17:52:31', 9),
(97, 'Hola a todos de nuevo', NULL, '2023-06-12 17:52:31', 10),
(98, 'Hola a todos de nuevo', NULL, '2023-06-12 17:52:31', 11),
(99, 'Hola a todos de nuevo', NULL, '2023-06-12 17:52:31', 12),
(100, 'Hola a todos de nuevo', NULL, '2023-06-12 17:52:31', 13),
(101, 'Hola a todos de nuevo', NULL, '2023-06-12 17:52:31', 14),
(102, 'Hola a todos de nuevo', NULL, '2023-06-12 17:52:31', 15),
(103, 'Hola a todos de nuevo', NULL, '2023-06-12 17:52:31', 16),
(104, 'Hola a todos de nuevo', NULL, '2023-06-12 17:52:31', 17),
(105, 'Hola a todos de nuevo', NULL, '2023-06-12 17:52:31', 18),
(106, 'Hola a todos de nuevo', NULL, '2023-06-12 17:52:31', 19),
(107, 'Hola a todos de nuevo', NULL, '2023-06-12 17:52:31', 20),
(108, 'Hola a todos de nuevo', NULL, '2023-06-12 17:52:31', 21),
(109, 'Hola a todos de nuevo', NULL, '2023-06-12 17:52:31', 22),
(110, 'Hola a todos de nuevo', NULL, '2023-06-12 17:52:31', 23),
(111, 'Hola a todos de nuevo', NULL, '2023-06-12 17:52:31', 24),
(112, 'Hola a todos de nuevo', NULL, '2023-06-12 17:52:31', 25);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `surname` text NOT NULL,
  `nick` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(250) NOT NULL,
  `city` text DEFAULT NULL,
  `country` text DEFAULT NULL,
  `edad` int(11) DEFAULT NULL,
  `estudios` varchar(200) DEFAULT NULL,
  `idiomas` varchar(200) DEFAULT NULL,
  `linkedin` varchar(200) DEFAULT NULL,
  `hobbies` varchar(200) DEFAULT NULL,
  `conocimiento_extra` varchar(500) DEFAULT NULL,
  `image` varchar(500) DEFAULT NULL,
  `status` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`id`, `name`, `surname`, `nick`, `email`, `password`, `city`, `country`, `edad`, `estudios`, `idiomas`, `linkedin`, `hobbies`, `conocimiento_extra`, `image`, `status`) VALUES
(1, 'Ana', 'Sánchez', '@asanchez', 'ana.sanchez@example.com', '$2b$10$LcO8ri6eUVQC.R0FazxbSO1zxOOx7/RtG9yCREtBGSWLrZX04X2be', 'Madrid', 'España', 29, 'Licenciada en Administración de Empresas', 'Español, Inglés', 'https://www.linkedin.com/in/anasanchez', 'Pilates, Cocina, Viajar', 'Gestión financiera, Marketing digital', 'https://randomuser.me/api/portraits/women/1.jpg', 0),
(2, 'Luis', 'Gómez', '@lgomez', 'luis.gomez@example.com', '$2b$10$D8UjJiXa0PHaoCfBFG6TCe3VLJXdXsrtXos2JfuZC993/VkPdeViG', 'Barcelona', 'España', 35, 'Ingeniero de Software', 'Español, Catalán, Inglés', 'https://www.linkedin.com/in/luisgomez', 'Fútbol, Música, Cine', 'Desarrollo de aplicaciones móviles, Inteligencia artificial', 'https://randomuser.me/api/portraits/men/2.jpg', 0),
(3, 'Laura', 'Hernández', '@laurah', 'laura.hernandez@example.com', '$2b$10$ere/aFdRmmtpsQeTKnXW2uCQlNll7FgWUdlj8aD3Q9zgvOlOnjPqq', 'Valencia', 'España', 31, 'Licenciada en Psicología', 'Español, Inglés, Francés', 'https://www.linkedin.com/in/laurahernandez', 'Yoga, Leer, Fotografía', 'Psicoterapia, Coaching personal', 'https://randomuser.me/api/portraits/women/3.jpg', 0),
(4, 'Carlos', 'Rodríguez', '@carlosr', 'carlos.rodriguez@example.com', '$2b$10$rJ9mp8OeCKxmYaEEYEYLKew1CwunOl0TPnxELl.hdTdQC6gjfHsxW', 'Sevilla', 'España', 27, 'Ingeniero Civil', 'Español, Inglés', 'https://www.linkedin.com/in/carlosrodriguez', 'Fotografía, Senderismo, Música', 'Diseño de estructuras, Gestión de proyectos', 'https://randomuser.me/api/portraits/men/4.jpg', 0),
(5, 'Sara', 'López', '@saralopez', 'sara.lopez@example.com', '$2b$10$70grG5csPGhARiXaWGUbKe4I/sTCbHjGoeGPFlg4gMNx.OWq5BjxC', 'Bilbao', 'España', 33, 'Licenciada en Derecho', 'Español, Inglés', 'https://www.linkedin.com/in/saralopez', 'Pintura, Viajar, Cocina', 'Derecho laboral, Negociación', 'https://randomuser.me/api/portraits/women/5.jpg', 0),
(6, 'Miguel', 'Torres', '@migueltorres', 'miguel.torres@example.com', '$2b$10$chwEkSIp.JUD0NbAimaeBO9n0BzdWHHp3KKuzCNgGTd2N/ypRwnn6', 'Zaragoza', 'España', 29, 'Ingeniero Industrial', 'Español, Inglés', 'https://www.linkedin.com/in/migueltorres', 'Deportes acuáticos, Fotografía, Leer', 'Gestión de la cadena de suministro, Energías renovables', 'https://randomuser.me/api/portraits/men/6.jpg', 0),
(7, 'Elena', 'Jiménez', '@elenajimenez', 'elena.jimenez@example.com', '$2b$10$ZXf5DxuOwChP5J8vsPnSYOsZ9tUkEv8XxprqCZOws.IUM6h/gCZlW', 'Málaga', 'España', 28, 'Licenciada en Comunicación', 'Español, Inglés', 'https://www.linkedin.com/in/elenajimenez', 'Baile, Fotografía, Viajar', 'Marketing digital, Relaciones públicas', 'https://randomuser.me/api/portraits/women/7.jpg', 0),
(8, 'Antonio', 'Romero', '@antonioromero', 'antonio.romero@example.com', '$2b$10$9wI16dOTrjl7O5ofT/cdi.WkRPmHwQEud934mcUOqE4.nMw5lJkFS', 'Granada', 'España', 34, 'Licenciado en Economía', 'Español, Inglés', 'https://www.linkedin.com/in/antonioromero', 'Música, Fútbol, Cocina', 'Análisis financiero, Planificación estratégica', 'https://randomuser.me/api/portraits/men/8.jpg', 0),
(9, 'Isabel', 'Vargas', '@isabelvargas', 'isabel.vargas@example.com', '$2b$10$0.c8Ct9Dk/Utue2okf.pxeNXNKwCXAls3AHUhIzBFa5hPKsyp7Gy.', 'Alicante', 'España', 30, 'Arquitecta', 'Español, Inglés', 'https://www.linkedin.com/in/isabelvargas', 'Arte, Senderismo, Viajar', 'Diseño sostenible, Modelado 3D', 'https://randomuser.me/api/portraits/women/9.jpg', 0),
(10, 'Javier', 'Ortega', '@javierortega', 'javier.ortega@example.com', '$2b$10$LrDHkHJjzFZr1Yzzo5mcieZCHb8rEJItHWlacSELd1bFtQEb1ALba', 'Valencia', 'España', 27, 'Ingeniero de Telecomunicaciones', 'Español, Inglés', 'https://www.linkedin.com/in/javierortega', 'Música, Ciclismo, Videojuegos', 'Redes móviles, Seguridad informática', 'https://randomuser.me/api/portraits/men/10.jpg', 0),
(11, 'Lucía', 'Navarro', '@lucianavarro', 'lucia.navarro@example.com', '$2b$10$R3oOXIHLRwsUmfi1F9C1rOZrZ5hYOxIUWn9tx8jpmSHE7TSSG3xYm', 'Sevilla', 'España', 31, 'Licenciada en Medicina', 'Español, Inglés', 'https://www.linkedin.com/in/lucianavarro', 'Yoga, Fotografía, Cocina', 'Medicina preventiva, Nutrición', 'https://randomuser.me/api/portraits/women/11.jpg', 0),
(12, 'Pedro', 'Rojas', '@pedrorojas', 'pedro.rojas@example.com', '$2b$10$yYq0zinbWCX9DXTwtdcmCeghp55eoJjBzNX7Ppxfd0Pek/LoNEUlO', 'Barcelona', 'España', 29, 'Ingeniero de Sistemas', 'Español, Catalán, Inglés', 'https://www.linkedin.com/in/pedrorojas', 'Fútbol, Música, Viajar', 'Desarrollo de software, Administración de servidores', 'https://randomuser.me/api/portraits/men/12.jpg', 0),
(13, 'Marina', 'Soler', '@marinasoler', 'marina.soler@example.com', '$2b$10$ywwaSlsoknLXNa19pWXKI.6BhrvY9nDJ5LXnQ4RGu5CKoMvIRONSy', 'Valencia', 'España', 26, 'Licenciada en Biología', 'Español, Inglés', 'https://www.linkedin.com/in/marinasoler', 'Fotografía, Senderismo, Cocina', 'Biología marina, Ecología', 'https://randomuser.me/api/portraits/women/13.jpg', 0),
(14, 'Andrés', 'Silva', '@andressilva', 'andres.silva@example.com', '$2b$10$XERyXgY.PixPTdNzQgIhiurjrf8wDUdAqXShRGDzrJuLT1IPf713e', 'Madrid', 'España', 33, 'Licenciado en Derecho', 'Español, Inglés', 'https://www.linkedin.com/in/andressilva', 'Gimnasio, Viajar, Leer', 'Derecho penal, Mediación', 'https://randomuser.me/api/portraits/men/14.jpg', 0),
(15, 'Carmen', 'Vega', '@carmenvega', 'carmen.vega@example.com', '$2b$10$Ej2eAiLT89oxxseeJiLYOuCb9EkMrxMdxUSAM5TluYGB2rtt7l1De', 'Sevilla', 'España', 28, 'Licenciada en Marketing', 'Español, Inglés', 'https://www.linkedin.com/in/carmenvega', 'Pintura, Fotografía, Yoga', 'Investigación de mercados, Marketing digital', 'https://randomuser.me/api/portraits/women/15.jpg', 0),
(16, 'Daniel', 'Garcez', '@danigarrido', 'daniel.garrido@example.com', '$2b$10$kM23hgQ6B7oco0GRk8tfveGGDdKYCBsVaDBFQAlK08Yc1j8mMFgLO', 'Málaga', 'España', 32, 'Ingeniero de Telecomunicaciones', 'Español, Inglés, Italiano', 'https://www.linkedin.com/in/danielgarrido', 'Ciclismo, Música, Viajar, Deportes', 'Redes de datos, Internet de las cosas, Developers Fullstack', 'https://randomuser.me/api/portraits/men/16.jpg', 0),
(17, 'María José', 'Morales', '@mariaj', 'mariajose.morales@example.com', '$2b$10$UzcyXXo2AxtP29r9H9BZV.0IjqpRlJX.M7W1ZzYm4RyZ35c9iYnpW', 'Valencia', 'España', 29, 'Licenciada en Medicina', 'Español, Inglés', 'https://www.linkedin.com/in/mariajosemorales', 'Yoga, Fotografía, Cocina', 'Medicina interna, Nutrición', 'https://randomuser.me/api/portraits/women/17.jpg', 0),
(18, 'Jorge', 'Fernández', '@jorgefernandez', 'jorge.fernandez@example.com', '$2b$10$22FoLnwpSADdb94QgyMuHO429nshXUfSbwj80/Ce/xmT4icpTOKDa', 'Barcelona', 'España', 32, 'Licenciado en Administración de Empresas', 'Español, Catalán, Inglés', 'https://www.linkedin.com/in/jorgefernandez', 'Fútbol, Música, Viajar', 'Gestión financiera, Estrategia empresarial', 'https://randomuser.me/api/portraits/men/18.jpg', 0),
(19, 'Natalia', 'Pérez', '@nataliaperez', 'natalia.perez@example.com', '$2b$10$PbbKI2nJa3oI3UTDHaWape.v4xZhhHgYJHparxFahoFYvOWmm0E2y', 'Madrid', 'España', 27, 'Licenciada en Psicología', 'Español, Inglés', 'https://www.linkedin.com/in/nataliaperez', 'Pilates, Leer, Cocina', 'Psicoterapia, Coaching personal', 'https://randomuser.me/api/portraits/women/19.jpg', 0),
(20, 'Alejandro', 'López', '@alejandrol', 'alejandro.lopez@example.com', '$2b$10$XIXKjzeefdWVj5JulW9EAeFUt/W5f8Hm5pd..p7y3cCXNoa/3qKKG', 'Valencia', 'España', 33, 'Licenciado en Economía', 'Español, Inglés', 'https://www.linkedin.com/in/alejandrolopez', 'Música, Fútbol, Viajar', 'Análisis financiero, Planificación estratégica', 'https://randomuser.me/api/portraits/men/20.jpg', 0),
(21, 'María', 'Santos', '@mariasantos', 'maria.santos@example.com', '$2b$10$ood.5.npbUQg3lZxF94AnuxuDjdp.m8XJyux2exEicM1TdxRz6Y6C', 'Sevilla', 'España', 28, 'Ingeniera de Software', 'Español, Inglés', 'https://www.linkedin.com/in/mariasantos', 'Fotografía, Senderismo, Cine', 'Desarrollo de aplicaciones móviles, Inteligencia artificial', 'https://randomuser.me/api/portraits/women/21.jpg', 0),
(22, 'Diego', 'Castro', '@diegocastro', 'diego.castro@example.com', '$2b$10$/L5dL0Sw18DuhGZ.f3keiech.h4c6YuW.iUaG27ALYqjNo8aW6CMG', 'Madrid', 'España', 30, 'Licenciado en Derecho', 'Español, Inglés', 'https://www.linkedin.com/in/diegocastro', 'Fútbol, Viajar, Cocina', 'Derecho civil, Derecho laboral', 'https://randomuser.me/api/portraits/men/22.jpg', 1),
(23, 'Carlos', 'Garcia', '@canuñez', 'carlos.nunez@example.com', '$2b$10$FNEx.5Bd6m8DuuK.gsj7/u1VsvzA5vizP1AjdBr4q3/JAJb.pvwIG', 'Sevilla', 'España', 31, 'Ingeniero de Telecomunicaciones', 'Español, Inglés, Frances', 'https://www.linkedin.com/in/carlosnunez', 'Música, Fútbol, Viajar, Jugar', 'Redes de comunicaciones, Internet de las cosas', 'https://randomuser.me/api/portraits/women/21.jpg', 0),
(24, 'Ana', 'Martínez', '@anamartinez', 'ana.martinez@example.com', '$2b$10$JdfJed6/2oXKeWS4a1bITemtDCbCQzMbibzjFy03IUdv2DWMxvhB.', 'Sevilla', 'España', 29, 'Licenciada en Medicina', 'Español, Inglés', 'https://www.linkedin.com/in/anamartinez', 'Yoga, Fotografía, Cocina', 'Medicina interna, Nutrición', 'https://randomuser.me/api/portraits/women/25.jpg', 0),
(25, 'Laura', 'Garcia', '@lgarcia', 'laura.garcia@example.com', '$2b$10$NsV72kPbp0jYub5dmAWFB.fCoyEHj6oQAUcTsOd7/wMlcOWk96XI2', 'Barcelona', 'España', 26, 'Licenciada en Biología', 'Español, Catalán, Inglés', 'https://www.linkedin.com/in/laurahernandez', 'Pintura, Senderismo, Cocina', 'Biología molecular, Ecología', 'https://randomuser.me/api/portraits/women/23.jpg', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id_admin`),
  ADD KEY `user_id` (`user_id`);

--
-- Indices de la tabla `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`id_feedback`),
  ADD KEY `id_user_envia` (`id_user_envia`),
  ADD KEY `id_user_recive` (`id_user_recive`);

--
-- Indices de la tabla `follow`
--
ALTER TABLE `follow`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user` (`user_id`,`followed_id`),
  ADD KEY `followed` (`followed_id`);

--
-- Indices de la tabla `publication`
--
ALTER TABLE `publication`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user` (`user_id`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `admin`
--
ALTER TABLE `admin`
  MODIFY `id_admin` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `feedback`
--
ALTER TABLE `feedback`
  MODIFY `id_feedback` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `follow`
--
ALTER TABLE `follow`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT de la tabla `publication`
--
ALTER TABLE `publication`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=113;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `admin`
--
ALTER TABLE `admin`
  ADD CONSTRAINT `admin_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `feedback`
--
ALTER TABLE `feedback`
  ADD CONSTRAINT `feedback_ibfk_1` FOREIGN KEY (`id_user_envia`) REFERENCES `user` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `feedback_ibfk_2` FOREIGN KEY (`id_user_recive`) REFERENCES `user` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `follow`
--
ALTER TABLE `follow`
  ADD CONSTRAINT `follow_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `follow_ibfk_2` FOREIGN KEY (`followed_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `publication`
--
ALTER TABLE `publication`
  ADD CONSTRAINT `publication_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
