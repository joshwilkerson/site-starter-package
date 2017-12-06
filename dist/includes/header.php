<?php $host = $_SERVER['SERVER_NAME']; ?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="title" content="">
	<meta name="description" content="">
	<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">

	<!--[if IE]>
	<script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->

	<title>New Site Starter Package</title>
	<link rel="shortcut icon" href="favicon.ico">
	<link rel='stylesheet' href='css/layout.min.css' />

<?php if($host == "localhost") { echo '<script src="http://localhost:35729/livereload.js?snipver=1"></script>'; } ?>

</head>

<body<?php if($host == "localhost") { echo ' id="debug"'; } ?>>

<header></header>
