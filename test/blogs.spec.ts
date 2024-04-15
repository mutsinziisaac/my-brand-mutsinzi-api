import { expect } from "chai";
import { describe, it } from "mocha";
import { Request, Response } from "express";
import sinon, { SinonStub } from "sinon";
import * as blogController from "../controllers/blogController";
import Blog from "../models/blog";
import { NextFunction } from "connect";

describe("Blog Controller", () => {
  describe("createBlog", () => {
    it("should create a new blog", async () => {
      const req = {
        body: {
          title: "Test Title",
          description: "Test Description",
          image: "Test Image",
          comments: ["Comment 1", "Comment 2"],
        },
      } as unknown as Request;
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      } as unknown as Response;

      const blogSaveStub = sinon.stub(Blog.prototype, "save").resolves({});

      await blogController.createBlog(req, res, sinon.stub() as NextFunction);

      expect(blogSaveStub.calledOnce).to.be.true;
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledOnce).to.be.true;

      blogSaveStub.restore();
    });
  });

  describe("deleteBlog", () => {
    it("should delete an existing blog", async () => {
      const req = {
        params: {
          id: "6613e3b8d70d378f4b2f2ce1",
        },
      } as unknown as Request;
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      } as unknown as Response;

      const findByIdAndDeleteStub = sinon
        .stub(Blog, "findByIdAndDelete")
        .resolves({});

      await blogController.deleteBlog(req, res, sinon.stub() as NextFunction);

      expect(findByIdAndDeleteStub.calledOnceWith("6613e3b8d70d378f4b2f2ce1"))
        .to.be.true;
      expect((res.status as SinonStub).calledWith(200)).to.be.true;
      expect((res.json as SinonStub).calledOnce).to.be.true;

      findByIdAndDeleteStub.restore();
    });
  });
});
