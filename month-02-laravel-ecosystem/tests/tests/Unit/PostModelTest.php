<?php

declare(strict_types=1);

namespace Tests\Unit;

use PHPUnit\Framework\TestCase;
use App\Learning\PhpAdvancedConcepts\PostModel;

class PostModelTest extends TestCase
{
    private PostModel $subject;
    
    protected function setUp(): void
    {
        parent::setUp();
        $this->subject = new PostModel();
    }
    
    public function testCanBeInstantiated(): void
    {
        $this->assertInstanceOf(PostModel::class, $this->subject);
    }
    
    public function testProcessReturnsExpectedStructure(): void
    {
        $result = $this->subject->process();
        
        $this->assertIsArray($result);
        $this->assertArrayHasKey('success', $result);
        $this->assertArrayHasKey('data', $result);
        $this->assertArrayHasKey('message', $result);
    }
    
    public function testProcessReturnsSuccessfulResult(): void
    {
        $result = $this->subject->process();
        
        $this->assertTrue($result['success']);
        $this->assertNotEmpty($result['data']);
        $this->assertStringContainsString('processed successfully', $result['message']);
    }
    
    public function testDataContainsRequiredFields(): void
    {
        $result = $this->subject->process();
        $data = $result['data'];
        
        $this->assertArrayHasKey('processed_at', $data);
        $this->assertArrayHasKey('iteration', $data);
        $this->assertArrayHasKey('topic', $data);
        $this->assertArrayHasKey('learning_notes', $data);
    }
    
    public function testLearningNotesAreNotEmpty(): void
    {
        $result = $this->subject->process();
        $learningNotes = $result['data']['learning_notes'];
        
        $this->assertIsArray($learningNotes);
        $this->assertNotEmpty($learningNotes);
        $this->assertGreaterThan(3, count($learningNotes));
    }
}
