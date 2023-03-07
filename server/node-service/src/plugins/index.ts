import { DataSourcePlugin, DataSourcePluginFactory } from "openblocks-sdk/dataSource";
import s3Plugin from "./s3";
import n8nPlugin from "./n8n";
import openApiPlugin from "./openApi";
import dynamoDBPlugin from "./dynamodb";
import firebasePlugin from "./firebase";
import couchdbPlugin from "./couchdb";
import wooCommercePlugin from "./woocommerce";
import openAiPlugin from "./openAi";
import athenaPlugin from "./athena";
import lambdaPlugin from "./lambda";
import googleCloudStorage from "./googleCloudStorage";
import stripePlugin from "./stripe";
import asanaPlugin from "./asana";
import circleCiPlugin from "./circleCi";
import frontPlugin from "./front";
import githubPlugin from "./github";
import huggingFacePlugin from "./huggingFaceEndpoint";
import jiraPlugin from "./jira";
import oneSignalPlugin from "./oneSignal";
import sendGridPlugin from "./sendGrid";
import shopifyPlugin from "./shopify";
import slackPlugin from "./slack";
import supabasePlugin from "./supabase";
import cloudinaryPlugin from "./cloudinary";
import notionPlugin from "./notion";
import datadogPlugin from "./datadog";
import twilioPlugin from "./twilio";
import gitlabPlugin from "./gitlab";
import faunaPlugin from "./fauna";
import huggingFaceInferencePlugin from "./huggingFaceInference";
import didPlugin from "./did";
import bigQueryPlugin from "./bigQuery";

let plugins: (DataSourcePlugin | DataSourcePluginFactory)[] = [
  s3Plugin,
  openApiPlugin,
  n8nPlugin,
  dynamoDBPlugin,
  firebasePlugin,
  couchdbPlugin,
  wooCommercePlugin,
  openAiPlugin,
  athenaPlugin,
  lambdaPlugin,
  googleCloudStorage,
  stripePlugin,
  asanaPlugin,
  circleCiPlugin,
  frontPlugin,
  githubPlugin,
  huggingFacePlugin,
  huggingFaceInferencePlugin,
  jiraPlugin,
  oneSignalPlugin,
  sendGridPlugin,
  shopifyPlugin,
  slackPlugin,
  supabasePlugin,
  cloudinaryPlugin,
  notionPlugin,
  datadogPlugin,
  twilioPlugin,
  gitlabPlugin,
  faunaPlugin,
  didPlugin,
  bigQueryPlugin
];

try {
  plugins = require("../ee/plugins").default;
  console.info("using ee plugins");
} catch {}

export default plugins;
